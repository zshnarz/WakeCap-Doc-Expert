/**
 * WakeCap Document Version Manager
 *
 * Tracks all generated documents in output/manifest.json with version history,
 * checksums, and changelog entries. Supports registering new documents,
 * bumping versions, and viewing history.
 *
 * Usage:
 *   node templates/version-manager.js --list
 *   node templates/version-manager.js --register WC-WS-DS-v1.0.docx
 *   node templates/version-manager.js --register --all
 *   node templates/version-manager.js --bump-minor WC-WS-DS
 *   node templates/version-manager.js --bump-major WC-WS-DS
 *   node templates/version-manager.js --bump-minor WC-WS-DS --changelog "Updated specs"
 *   node templates/version-manager.js --history WC-WS-DS
 *
 * No external dependencies -- uses only fs, path, crypto.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'output');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');

// Document ID pattern: WC-<PRODUCT>-<TYPE>-v<MAJOR>.<MINOR>.docx
const DOC_FILENAME_RE = /^(WC-([A-Z]{2,4})-([A-Z]{2,4}))-v(\d+\.\d+)\.docx$/;

// Product code -> folder name mapping (reverse of PRODUCT_CODES in docx-generator)
const PRODUCT_FOLDER_MAP = {
  WS: 'weather-station',
  GW: 'gateway',
  PS: 'power-solutions',
  SH: 'smart-hat',
  AN: 'anchor',
  MA: 'modbus-asset'
};

// Document type codes -> readable names
const DOC_TYPE_NAMES = {
  DS: 'Product Datasheet',
  PO: 'Product Overview',
  SB: 'Solution Brief',
  CS: 'Compliance Summary',
  QR: 'Quick Reference',
  IG: 'Installation Guide',
  SG: 'Setup Guide',
  CG: 'Commissioning Guide',
  TG: 'Troubleshooting Guide',
  MG: 'Maintenance Manual',
  PM: 'Product Manual',
  TR: 'Technical Reference',
  ICD: 'Interface Control Document',
  SIG: 'System Integration Guide',
  SM: 'Safety Manual',
  RN: 'Release Notes',
  OG: 'Operations Guide',
  RB: 'Runbook',
  PC: 'Product Catalogue',
  LRG: 'Layout Reference Guide',
  OSG: 'On-Site Guide',
  TEM: 'Template'
};

// ---------------------------------------------------------------------------
// Manifest helpers
// ---------------------------------------------------------------------------

/**
 * Loads the manifest from disk, or returns a fresh empty manifest.
 * @returns {object} The manifest object.
 */
function loadManifest() {
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      const raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
      const manifest = JSON.parse(raw);
      // Ensure required top-level keys
      if (!manifest.documents) {
        manifest.documents = {};
      }
      return manifest;
    } catch (err) {
      console.error(`Error reading manifest: ${err.message}`);
      console.error('Creating a new manifest.');
    }
  }
  return {
    generated: new Date().toISOString(),
    documents: {}
  };
}

/**
 * Writes the manifest to disk, creating the output directory if needed.
 * @param {object} manifest
 */
function saveManifest(manifest) {
  manifest.generated = new Date().toISOString();
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
}

// ---------------------------------------------------------------------------
// File utilities
// ---------------------------------------------------------------------------

/**
 * Computes the SHA-256 hex digest of a file.
 * @param {string} filePath Absolute path to the file.
 * @returns {string} Prefixed checksum string, e.g. "sha256:abc123..."
 */
function computeChecksum(filePath) {
  const buffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(buffer).digest('hex');
  return `sha256:${hash}`;
}

/**
 * Parses a WakeCap document filename into its constituent parts.
 *
 * @param {string} filename e.g. "WC-WS-DS-v1.0.docx"
 * @returns {{ docId: string, productCode: string, typeCode: string, version: string } | null}
 */
function parseDocFilename(filename) {
  const match = filename.match(DOC_FILENAME_RE);
  if (!match) return null;
  return {
    docId: match[1],        // WC-WS-DS
    productCode: match[2],  // WS
    typeCode: match[3],     // DS
    version: match[4]       // 1.0
  };
}

/**
 * Finds all .docx files recursively under a directory.
 * @param {string} dir
 * @returns {string[]} Array of absolute file paths.
 */
function findDocxFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findDocxFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.docx')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Determines the relative file path (from repo root) for a document file.
 * Tries to locate the file inside the product's subfolder first, then
 * falls back to the output root.
 *
 * @param {string} absPath Absolute path of the file.
 * @returns {string} Relative path like "output/weather-station/WC-WS-DS-v1.0.docx"
 */
function toRelativePath(absPath) {
  return path.relative(ROOT_DIR, absPath).replace(/\\/g, '/');
}

// ---------------------------------------------------------------------------
// Core operations
// ---------------------------------------------------------------------------

/**
 * Registers a single .docx file into the manifest.
 *
 * @param {string} fileArg Filename, relative path, or absolute path.
 * @param {object} manifest The current manifest object (mutated in place).
 * @param {string} [changelog] Optional changelog message for the entry.
 * @returns {boolean} true if registered successfully, false otherwise.
 */
function registerDocument(fileArg, manifest, changelog) {
  // Resolve to absolute path -- try several strategies
  let absPath = null;
  const candidates = [
    path.resolve(fileArg),
    path.resolve(OUTPUT_DIR, fileArg),
    // Try inside product sub-folders
    ...Object.values(PRODUCT_FOLDER_MAP).map(folder =>
      path.resolve(OUTPUT_DIR, folder, path.basename(fileArg))
    )
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      absPath = candidate;
      break;
    }
  }

  if (!absPath) {
    console.error(`  File not found: ${fileArg}`);
    console.error('  Searched in output/ and its subdirectories.');
    return false;
  }

  const filename = path.basename(absPath);
  const parsed = parseDocFilename(filename);
  if (!parsed) {
    console.error(`  Filename does not match WakeCap naming convention: ${filename}`);
    console.error('  Expected format: WC-<PRODUCT>-<TYPE>-v<MAJOR>.<MINOR>.docx');
    return false;
  }

  const { docId, productCode, typeCode, version } = parsed;
  const checksum = computeChecksum(absPath);
  const relPath = toRelativePath(absPath);
  const today = new Date().toISOString().split('T')[0];
  const product = PRODUCT_FOLDER_MAP[productCode] || productCode.toLowerCase();

  const entry = {
    version,
    date: today,
    file: relPath,
    checksum,
    changelog: changelog || 'Initial release'
  };

  if (!manifest.documents[docId]) {
    // New document -- create record
    manifest.documents[docId] = {
      currentVersion: version,
      product,
      type: typeCode,
      history: [entry]
    };
    console.log(`  Registered NEW: ${docId} v${version}`);
    console.log(`    Product : ${product}`);
    console.log(`    Type    : ${DOC_TYPE_NAMES[typeCode] || typeCode}`);
    console.log(`    File    : ${relPath}`);
    console.log(`    Checksum: ${checksum}`);
  } else {
    const doc = manifest.documents[docId];
    // Check if this exact version+checksum already exists
    const existing = doc.history.find(
      h => h.version === version && h.checksum === checksum
    );
    if (existing) {
      console.log(`  Already registered: ${docId} v${version} (checksum matches)`);
      return true;
    }

    // Check if this version exists but with a different checksum (re-generated)
    const sameVersion = doc.history.find(h => h.version === version);
    if (sameVersion) {
      sameVersion.date = today;
      sameVersion.file = relPath;
      sameVersion.checksum = checksum;
      sameVersion.changelog = changelog || sameVersion.changelog || 'Re-generated';
      console.log(`  Updated: ${docId} v${version} (new checksum)`);
    } else {
      // New version entry
      doc.history.push(entry);
      // Update currentVersion if this version is higher
      if (compareVersions(version, doc.currentVersion) > 0) {
        doc.currentVersion = version;
      }
      console.log(`  Registered: ${docId} v${version}`);
    }
    console.log(`    File    : ${relPath}`);
    console.log(`    Checksum: ${checksum}`);
  }

  return true;
}

/**
 * Registers all .docx files found in the output/ directory tree.
 * @param {object} manifest
 */
function registerAll(manifest) {
  const files = findDocxFiles(OUTPUT_DIR);
  const docxFiles = files.filter(f => {
    const name = path.basename(f);
    return DOC_FILENAME_RE.test(name);
  });

  if (docxFiles.length === 0) {
    console.log('No WakeCap .docx files found in output/.');
    return;
  }

  console.log(`Found ${docxFiles.length} WakeCap .docx file(s) in output/:\n`);
  let registered = 0;
  for (const filePath of docxFiles) {
    const result = registerDocument(filePath, manifest);
    if (result) registered++;
  }
  console.log(`\nRegistered/updated ${registered} of ${docxFiles.length} file(s).`);
}

/**
 * Compares two version strings numerically.
 * @param {string} a e.g. "2.1"
 * @param {string} b e.g. "1.3"
 * @returns {number} Positive if a > b, negative if a < b, 0 if equal.
 */
function compareVersions(a, b) {
  const [aMajor, aMinor] = a.split('.').map(Number);
  const [bMajor, bMinor] = b.split('.').map(Number);
  if (aMajor !== bMajor) return aMajor - bMajor;
  return aMinor - bMinor;
}

/**
 * Bumps the version of an existing document (minor or major).
 *
 * @param {string} docId e.g. "WC-WS-DS"
 * @param {'minor'|'major'} bumpType
 * @param {object} manifest
 * @param {string} [changelog]
 * @returns {boolean}
 */
function bumpVersion(docId, bumpType, manifest, changelog) {
  const doc = manifest.documents[docId];
  if (!doc) {
    console.error(`Document "${docId}" not found in manifest.`);
    console.error('Run --list to see all tracked documents, or --register to add it first.');
    return false;
  }

  const current = doc.currentVersion;
  const [major, minor] = current.split('.').map(Number);
  let newVersion;

  if (bumpType === 'major') {
    newVersion = `${major + 1}.0`;
  } else {
    newVersion = `${major}.${minor + 1}`;
  }

  // Derive the expected new filename and check if it exists on disk
  const newFilename = `${docId}-v${newVersion}.docx`;
  const productFolder = doc.product || '';
  const possiblePaths = [
    path.join(OUTPUT_DIR, productFolder, newFilename),
    path.join(OUTPUT_DIR, newFilename)
  ];

  let newFilePath = null;
  let checksum = null;

  for (const candidate of possiblePaths) {
    if (fs.existsSync(candidate)) {
      newFilePath = candidate;
      checksum = computeChecksum(candidate);
      break;
    }
  }

  // If the new version file does not exist yet, record the version bump
  // with a placeholder file path -- the file will be generated later.
  const today = new Date().toISOString().split('T')[0];
  const relPath = newFilePath
    ? toRelativePath(newFilePath)
    : `output/${productFolder}/${newFilename}`;

  const entry = {
    version: newVersion,
    date: today,
    file: relPath,
    checksum: checksum || 'pending',
    changelog: changelog || `Version bump: ${current} -> ${newVersion}`
  };

  doc.history.push(entry);
  doc.currentVersion = newVersion;

  console.log(`Version bumped: ${docId}`);
  console.log(`  ${current} -> ${newVersion} (${bumpType})`);
  console.log(`  File     : ${relPath}`);
  if (checksum) {
    console.log(`  Checksum : ${checksum}`);
  } else {
    console.log(`  Checksum : pending (file not yet generated)`);
  }
  if (changelog) {
    console.log(`  Changelog: ${changelog}`);
  }

  return true;
}

/**
 * Displays the version history for a document.
 * @param {string} docId e.g. "WC-WS-DS"
 * @param {object} manifest
 */
function showHistory(docId, manifest) {
  const doc = manifest.documents[docId];
  if (!doc) {
    console.error(`Document "${docId}" not found in manifest.`);
    console.error('Run --list to see all tracked documents.');
    return;
  }

  const typeName = DOC_TYPE_NAMES[doc.type] || doc.type;
  const productName = doc.product || 'unknown';

  console.log(`\nVersion History: ${docId}`);
  console.log(`Product: ${productName}`);
  console.log(`Type   : ${typeName} (${doc.type})`);
  console.log(`Current: v${doc.currentVersion}`);
  console.log('-'.repeat(70));

  if (!doc.history || doc.history.length === 0) {
    console.log('  No history entries.');
    return;
  }

  // Sort history by version descending
  const sorted = [...doc.history].sort((a, b) => compareVersions(b.version, a.version));

  for (const entry of sorted) {
    const marker = entry.version === doc.currentVersion ? ' (current)' : '';
    console.log(`  v${entry.version}${marker}`);
    console.log(`    Date     : ${entry.date}`);
    console.log(`    File     : ${entry.file}`);
    console.log(`    Checksum : ${entry.checksum}`);
    console.log(`    Changelog: ${entry.changelog}`);
    console.log('');
  }
}

/**
 * Lists all tracked documents in the manifest.
 * @param {object} manifest
 */
function listDocuments(manifest) {
  const docIds = Object.keys(manifest.documents);
  if (docIds.length === 0) {
    console.log('No documents tracked in manifest.');
    console.log('Use --register <filename> or --register --all to add documents.');
    return;
  }

  console.log(`\nWakeCap Document Manifest`);
  console.log(`Last updated: ${manifest.generated || 'unknown'}`);
  console.log(`Total documents: ${docIds.length}`);
  console.log('-'.repeat(70));

  // Group by product
  const byProduct = {};
  for (const id of docIds) {
    const doc = manifest.documents[id];
    const product = doc.product || 'unknown';
    if (!byProduct[product]) byProduct[product] = [];
    byProduct[product].push({ id, ...doc });
  }

  for (const [product, docs] of Object.entries(byProduct).sort()) {
    console.log(`\n  ${product.toUpperCase()}`);
    for (const doc of docs.sort((a, b) => a.id.localeCompare(b.id))) {
      const typeName = DOC_TYPE_NAMES[doc.type] || doc.type;
      const versions = doc.history ? doc.history.length : 0;
      console.log(`    ${doc.id}  v${doc.currentVersion}  ${typeName}  (${versions} version${versions !== 1 ? 's' : ''})`);
    }
  }
  console.log('');
}

// ---------------------------------------------------------------------------
// CLI argument parser
// ---------------------------------------------------------------------------

/**
 * Parses process.argv into a structured options object.
 * @returns {object}
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    command: null,     // 'list' | 'register' | 'bump-minor' | 'bump-major' | 'history'
    target: null,      // filename or docId depending on command
    all: false,        // --all flag for register
    changelog: null    // --changelog "message"
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];

    switch (arg) {
      case '--list':
        opts.command = 'list';
        break;

      case '--register':
        opts.command = 'register';
        // Next arg could be a filename or --all
        if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
          opts.target = args[++i];
        }
        break;

      case '--all':
        opts.all = true;
        break;

      case '--bump-minor':
        opts.command = 'bump-minor';
        if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
          opts.target = args[++i];
        }
        break;

      case '--bump-major':
        opts.command = 'bump-major';
        if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
          opts.target = args[++i];
        }
        break;

      case '--history':
        opts.command = 'history';
        if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
          opts.target = args[++i];
        }
        break;

      case '--changelog':
        if (i + 1 < args.length) {
          opts.changelog = args[++i];
        } else {
          console.error('--changelog requires a message argument.');
          process.exit(1);
        }
        break;

      case '--help':
      case '-h':
        opts.command = 'help';
        break;

      default:
        // If no command set yet and this looks like a positional arg, warn
        console.error(`Unknown argument: ${arg}`);
        console.error('Use --help for usage information.');
        process.exit(1);
    }

    i++;
  }

  return opts;
}

/**
 * Prints usage help.
 */
function printHelp() {
  console.log(`
WakeCap Document Version Manager
=================================

Usage:
  node templates/version-manager.js <command> [options]

Commands:
  --list                          List all tracked documents
  --register <filename>           Register a specific .docx file
  --register --all                Register all .docx files in output/
  --bump-minor <docId>            Bump minor version (e.g. 1.0 -> 1.1)
  --bump-major <docId>            Bump major version (e.g. 1.0 -> 2.0)
  --history <docId>               Show version history for a document

Options:
  --changelog "message"           Attach a changelog entry (with --bump-minor/--bump-major)
  --all                           With --register, scan all .docx files in output/
  --help, -h                      Show this help message

Document ID Format:
  WC-<PRODUCT>-<TYPE>  (e.g. WC-WS-DS, WC-GW-PM, WC-PS-QR)

Examples:
  node templates/version-manager.js --register WC-WS-DS-v1.0.docx
  node templates/version-manager.js --register --all
  node templates/version-manager.js --bump-minor WC-WS-DS --changelog "Updated sensor specs"
  node templates/version-manager.js --bump-major WC-GW-PM --changelog "Major hardware revision"
  node templates/version-manager.js --history WC-WS-DS
  node templates/version-manager.js --list
`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const opts = parseArgs();

  if (!opts.command) {
    console.error('No command specified. Use --help for usage information.');
    process.exit(1);
  }

  if (opts.command === 'help') {
    printHelp();
    process.exit(0);
  }

  const manifest = loadManifest();

  switch (opts.command) {
    case 'list':
      listDocuments(manifest);
      break;

    case 'register':
      if (opts.all) {
        registerAll(manifest);
      } else if (opts.target) {
        const ok = registerDocument(opts.target, manifest, opts.changelog);
        if (!ok) process.exit(1);
      } else {
        console.error('--register requires a filename or --all flag.');
        console.error('Examples:');
        console.error('  node templates/version-manager.js --register WC-WS-DS-v1.0.docx');
        console.error('  node templates/version-manager.js --register --all');
        process.exit(1);
      }
      saveManifest(manifest);
      console.log('\nManifest saved to: ' + MANIFEST_PATH);
      break;

    case 'bump-minor':
      if (!opts.target) {
        console.error('--bump-minor requires a document ID (e.g. WC-WS-DS).');
        process.exit(1);
      }
      if (bumpVersion(opts.target, 'minor', manifest, opts.changelog)) {
        saveManifest(manifest);
        console.log('\nManifest saved to: ' + MANIFEST_PATH);
      } else {
        process.exit(1);
      }
      break;

    case 'bump-major':
      if (!opts.target) {
        console.error('--bump-major requires a document ID (e.g. WC-WS-DS).');
        process.exit(1);
      }
      if (bumpVersion(opts.target, 'major', manifest, opts.changelog)) {
        saveManifest(manifest);
        console.log('\nManifest saved to: ' + MANIFEST_PATH);
      } else {
        process.exit(1);
      }
      break;

    case 'history':
      if (!opts.target) {
        console.error('--history requires a document ID (e.g. WC-WS-DS).');
        process.exit(1);
      }
      showHistory(opts.target, manifest);
      break;

    default:
      console.error(`Unknown command: ${opts.command}`);
      process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Module exports (for programmatic use by other generators)
// ---------------------------------------------------------------------------

module.exports = {
  loadManifest,
  saveManifest,
  registerDocument,
  registerAll,
  bumpVersion,
  showHistory,
  listDocuments,
  computeChecksum,
  parseDocFilename,
  findDocxFiles,
  compareVersions,
  MANIFEST_PATH,
  OUTPUT_DIR,
  PRODUCT_FOLDER_MAP,
  DOC_TYPE_NAMES
};

// Run CLI when executed directly
if (require.main === module) {
  main();
}
