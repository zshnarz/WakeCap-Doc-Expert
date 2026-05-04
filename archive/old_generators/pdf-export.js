#!/usr/bin/env node
/**
 * WakeCap PDF Export Pipeline
 *
 * Converts generated .docx files to PDF using LibreOffice (headless mode).
 * Falls back to manual instructions if LibreOffice is not installed.
 *
 * Usage:
 *   node templates/pdf-export.js --file output/weather-station/WC-WS-DS-v1.0.docx
 *   node templates/pdf-export.js --product weather-station          # All docs for product
 *   node templates/pdf-export.js --all                              # All docs in output/
 *
 * Requires: LibreOffice (soffice) on PATH
 *   Windows: choco install libreoffice-still
 *   macOS:   brew install --cask libreoffice
 *   Linux:   sudo apt install libreoffice
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'output');

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { file: null, product: null, all: false };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--file':
      case '-f':
        opts.file = args[++i];
        break;
      case '--product':
      case '-p':
        opts.product = args[++i];
        break;
      case '--all':
        opts.all = true;
        break;
      case '--help':
      case '-h':
        console.log(`
WakeCap PDF Export Pipeline

Usage:
  node templates/pdf-export.js --file <path.docx>     Convert single file
  node templates/pdf-export.js --product <name>        Convert all docs for product
  node templates/pdf-export.js --all                   Convert all docs in output/

Requires LibreOffice (soffice) on PATH.

Install:
  Windows: choco install libreoffice-still
  macOS:   brew install --cask libreoffice
  Linux:   sudo apt install libreoffice
`);
        process.exit(0);
    }
  }
  return opts;
}

// ---------------------------------------------------------------------------
// LibreOffice detection
// ---------------------------------------------------------------------------

function findLibreOffice() {
  // Common paths by OS
  const candidates = [
    'soffice',
    'C:\\Program Files\\LibreOffice\\program\\soffice.exe',
    'C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe',
    '/usr/bin/soffice',
    '/usr/local/bin/soffice',
    '/Applications/LibreOffice.app/Contents/MacOS/soffice'
  ];

  for (const candidate of candidates) {
    try {
      execSync(`"${candidate}" --version`, { stdio: 'pipe', timeout: 5000 });
      return candidate;
    } catch {
      // Not found, try next
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Conversion
// ---------------------------------------------------------------------------

function convertDocxToPdf(soffice, docxPath) {
  const dir = path.dirname(docxPath);
  const basename = path.basename(docxPath, '.docx');
  const pdfPath = path.join(dir, `${basename}.pdf`);

  try {
    execSync(
      `"${soffice}" --headless --convert-to pdf --outdir "${dir}" "${docxPath}"`,
      { stdio: 'pipe', timeout: 60000 }
    );

    if (fs.existsSync(pdfPath)) {
      return { success: true, pdf: pdfPath };
    }
    return { success: false, error: 'PDF file not created' };
  } catch (err) {
    return { success: false, error: err.message.split('\n')[0] };
  }
}

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

function findDocxFiles(opts) {
  const files = [];

  if (opts.file) {
    const resolved = path.resolve(opts.file);
    if (!fs.existsSync(resolved)) {
      console.error(`ERROR: File not found: ${resolved}`);
      process.exit(1);
    }
    files.push(resolved);
  } else if (opts.product) {
    const productDir = path.join(outputDir, opts.product);
    if (!fs.existsSync(productDir)) {
      console.error(`ERROR: Product directory not found: ${productDir}`);
      process.exit(1);
    }
    const entries = fs.readdirSync(productDir).filter(f => f.endsWith('.docx'));
    files.push(...entries.map(f => path.join(productDir, f)));
  } else if (opts.all) {
    // Scan all subdirectories of output/
    if (fs.existsSync(outputDir)) {
      const subdirs = fs.readdirSync(outputDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

      for (const sub of subdirs) {
        const subDir = path.join(outputDir, sub);
        const entries = fs.readdirSync(subDir).filter(f => f.endsWith('.docx'));
        files.push(...entries.map(f => path.join(subDir, f)));
      }
    }
  }

  return files;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const opts = parseArgs();

  if (!opts.file && !opts.product && !opts.all) {
    console.error('ERROR: Specify --file, --product, or --all');
    process.exit(1);
  }

  // Find LibreOffice
  const soffice = findLibreOffice();
  if (!soffice) {
    console.error('LibreOffice not found on this system.\n');
    console.error('To enable automatic PDF export, install LibreOffice:');
    console.error('  Windows: choco install libreoffice-still');
    console.error('  macOS:   brew install --cask libreoffice');
    console.error('  Linux:   sudo apt install libreoffice\n');
    console.error('Manual conversion:');
    console.error('  1. Open the .docx file in Microsoft Word or LibreOffice');
    console.error('  2. File → Save As / Export as PDF');
    console.error('  3. Save with the same filename but .pdf extension');
    process.exit(1);
  }

  console.log(`Using LibreOffice: ${soffice}`);

  // Find files to convert
  const files = findDocxFiles(opts);
  if (files.length === 0) {
    console.error('No .docx files found to convert.');
    process.exit(1);
  }

  console.log(`Converting ${files.length} file(s)...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    const rel = path.relative(rootDir, file);
    const result = convertDocxToPdf(soffice, file);

    if (result.success) {
      console.log(`  OK:   ${rel} → ${path.basename(result.pdf)}`);
      successCount++;
    } else {
      console.log(`  FAIL: ${rel} — ${result.error}`);
      failCount++;
    }
  }

  console.log(`\nComplete: ${successCount} succeeded, ${failCount} failed out of ${files.length} total.`);
  process.exit(failCount > 0 ? 1 : 0);
}

main();
