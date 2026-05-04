#!/usr/bin/env node
/**
 * WakeCap Pandoc Document Generator
 *
 * Converts markdown documents to styled .docx using Pandoc with
 * WakeCap reference templates and Lua filters.
 *
 * Usage:
 *   node pandoc/generate.js input.md                          # Version B (default)
 *   node pandoc/generate.js input.md --version A              # Version A (marketing)
 *   node pandoc/generate.js input.md -o custom-output.docx    # Custom output path
 *   node pandoc/generate.js input.md --no-toc --no-numbers    # Skip TOC and numbering
 *
 * The input markdown should include YAML frontmatter:
 *   ---
 *   title: "Weather Station Product Manual"
 *   doc-id: WC-WS-PM-v1.0
 *   product: Weather Station
 *   doc-type: Product Manual
 *   revision-date: 2026-03-12
 *   ---
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PANDOC_DIR = __dirname;

// Document type codes for filename generation
const PRODUCT_CODES = {
  'weather-station': 'WS',
  'gateway': 'GW',
  'power-solutions': 'PS',
  'smart-hat': 'SH',
  'anchor': 'AN',
  'modbus-asset': 'MA'
};

const DOCUMENT_TYPES = {
  DS: 'Product Datasheet',     PO: 'Product Overview',
  SB: 'Solution Brief',       CS: 'Compliance Summary',
  QR: 'Quick Reference',      IG: 'Installation Guide',
  SG: 'Setup Guide',          CG: 'Commissioning Guide',
  TG: 'Troubleshooting Guide',MG: 'Maintenance Manual',
  PM: 'Product Manual',       TR: 'Technical Reference',
  ICD: 'Interface Control Document', SIG: 'System Integration Guide',
  SM: 'Safety Manual',        RN: 'Release Notes',
  OG: 'Operations Guide',     RB: 'Runbook',
  PC: 'Product Catalogue'
};

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    input: null,
    output: null,
    version: 'B',
    toc: null,       // null = use defaults file setting
    numbers: null,   // null = use defaults file setting
    dryRun: false,
    extra: []        // extra pandoc flags
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--version': case '-v':
        opts.version = (args[++i] || 'B').toUpperCase();
        break;
      case '--output': case '-o':
        opts.output = args[++i];
        break;
      case '--toc':
        opts.toc = true;
        break;
      case '--no-toc':
        opts.toc = false;
        break;
      case '--numbers':
        opts.numbers = true;
        break;
      case '--no-numbers':
        opts.numbers = false;
        break;
      case '--dry-run':
        opts.dryRun = true;
        break;
      case '--help': case '-h':
        printHelp();
        process.exit(0);
        break;
      default:
        if (args[i].startsWith('-')) {
          opts.extra.push(args[i]);
        } else if (!opts.input) {
          opts.input = args[i];
        } else {
          opts.extra.push(args[i]);
        }
    }
  }
  return opts;
}

function printHelp() {
  console.log(`
WakeCap Pandoc Document Generator

Usage:
  node pandoc/generate.js <input.md> [options]

Options:
  --version, -v   Style version: A (marketing) or B (technical). Default: B
  --output, -o    Output file path. Default: output/<product>/<doc-id>.docx
  --toc           Force Table of Contents on
  --no-toc        Force Table of Contents off
  --numbers       Force section numbering on
  --no-numbers    Force section numbering off
  --dry-run       Validate input + reference template, print planned output, exit without invoking Pandoc
  --help, -h      Show this help

Document Type Codes:
${Object.entries(DOCUMENT_TYPES).map(([c, n]) => '  ' + c.padEnd(5) + n).join('\n')}

Examples:
  node pandoc/generate.js output/weather-station/WC-WS-PM-v1.0.md
  node pandoc/generate.js my-doc.md --version A -o brochure.docx
  node pandoc/generate.js my-doc.md --no-toc --no-numbers
`);
}

// ---------------------------------------------------------------------------
// Extract YAML frontmatter metadata from markdown
// ---------------------------------------------------------------------------

function extractMeta(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const meta = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\S+):\s*"?([^"]*)"?\s*$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  return meta;
}

// ---------------------------------------------------------------------------
// Find pandoc binary
// ---------------------------------------------------------------------------

function findPandoc() {
  const candidates = [
    'pandoc',
    path.join(process.env.LOCALAPPDATA || '', 'Pandoc', 'pandoc.exe'),
    'C:\\Program Files\\Pandoc\\pandoc.exe'
  ];
  for (const cmd of candidates) {
    try {
      execSync(`"${cmd}" --version`, { stdio: 'ignore' });
      return cmd;
    } catch { /* next */ }
  }
  console.error('ERROR: Pandoc not found. Install: winget install JohnMacFarlane.Pandoc');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const opts = parseArgs();

  if (!opts.input) {
    console.error('ERROR: Input file required.');
    printHelp();
    process.exit(1);
  }

  if (!['A', 'B'].includes(opts.version)) {
    console.error(`ERROR: Version must be A or B, got "${opts.version}"`);
    process.exit(1);
  }

  const inputPath = path.resolve(opts.input);
  if (!fs.existsSync(inputPath)) {
    console.error(`ERROR: Input file not found: ${inputPath}`);
    process.exit(1);
  }

  // Check reference template exists
  const refDoc = path.join(PANDOC_DIR, `reference-${opts.version}.docx`);
  if (!fs.existsSync(refDoc)) {
    console.error(`ERROR: Reference template not found: ${refDoc}`);
    console.error('Run: node pandoc/create-reference.js');
    process.exit(1);
  }

  // Read input to extract metadata for output path
  const content = fs.readFileSync(inputPath, 'utf-8');
  const meta = extractMeta(content);

  // Determine output path
  let outputPath;
  if (opts.output) {
    outputPath = path.resolve(opts.output);
  } else {
    // Use the same directory as the input file (keeps .docx next to .md)
    const docId = meta['doc-id'] || path.basename(inputPath, '.md');
    const inputDir = path.dirname(inputPath);
    outputPath = path.join(inputDir, `${docId}.docx`);
  }

  if (opts.dryRun) {
    console.log(`[dry-run] Would generate: ${path.basename(outputPath)}`);
    console.log(`  Input:    ${path.relative(ROOT, inputPath)}`);
    console.log(`  Style:    Version ${opts.version}`);
    console.log(`  Output:   ${path.relative(ROOT, outputPath)}`);
    console.log(`  Pandoc:   (skipped)`);
    return;
  }

  // Build pandoc command
  const pandoc = findPandoc();
  const defaultsFile = path.join(PANDOC_DIR, `defaults-${opts.version}.yaml`);
  const luaFilter = path.join(PANDOC_DIR, 'filters', 'wakecap.lua');

  const cmdParts = [
    `"${pandoc}"`,
    `"${inputPath}"`,
    `-d "${defaultsFile}"`,
    `--reference-doc="${refDoc}"`,
    `--lua-filter="${luaFilter}"`,
    `-o "${outputPath}"`
  ];

  // Override TOC/numbering if explicitly set
  if (opts.toc === true) cmdParts.push('--toc');
  if (opts.toc === false) cmdParts.push('--toc=false');
  if (opts.numbers === true) cmdParts.push('--number-sections');
  if (opts.numbers === false) cmdParts.push('--number-sections=false');

  // Add any extra flags
  for (const flag of opts.extra) {
    cmdParts.push(flag);
  }

  const cmd = cmdParts.join(' ');

  console.log(`Generating: ${path.basename(outputPath)}`);
  console.log(`  Input:    ${path.relative(ROOT, inputPath)}`);
  console.log(`  Style:    Version ${opts.version}`);
  console.log(`  Output:   ${path.relative(ROOT, outputPath)}`);

  try {
    execSync(cmd, { stdio: 'inherit', cwd: ROOT });
    console.log(`SUCCESS: ${outputPath}`);
  } catch (err) {
    console.error(`FAILED: Pandoc exited with error`);
    process.exit(1);
  }
}

main();
