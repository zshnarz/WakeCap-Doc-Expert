#!/usr/bin/env node
/**
 * WakeCap Pandoc Batch Generator
 *
 * Converts all .md files in output/ (or a specific product folder) to .docx.
 *
 * Usage:
 *   node pandoc/generate-all.js                          # All products
 *   node pandoc/generate-all.js --product weather-station # One product
 *   node pandoc/generate-all.js --version A               # Override style
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'output');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { product: null, version: 'B' };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--product': case '-p':
        opts.product = args[++i]; break;
      case '--version': case '-v':
        opts.version = (args[++i] || 'B').toUpperCase(); break;
      case '--help': case '-h':
        console.log(`
WakeCap Pandoc Batch Generator

Usage:
  node pandoc/generate-all.js [options]

Options:
  --product, -p   Process specific product folder only
  --version, -v   Style version: A or B (default: B)
  --help, -h      Show this help
`);
        process.exit(0);
    }
  }
  return opts;
}

function findMdFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isFile() && entry.endsWith('.md') && entry.startsWith('WC-')) {
      files.push(full);
    }
  }
  return files;
}

function main() {
  const opts = parseArgs();
  let dirs = [];

  if (opts.product) {
    dirs = [path.join(OUTPUT_DIR, opts.product)];
  } else {
    // Find all product subdirectories
    for (const entry of fs.readdirSync(OUTPUT_DIR)) {
      const full = path.join(OUTPUT_DIR, entry);
      if (fs.statSync(full).isDirectory()) {
        dirs.push(full);
      }
    }
  }

  let total = 0, success = 0, failed = 0;

  for (const dir of dirs) {
    const mdFiles = findMdFiles(dir);
    if (mdFiles.length === 0) continue;

    const product = path.basename(dir);
    console.log(`\n--- ${product} (${mdFiles.length} documents) ---`);

    for (const mdFile of mdFiles) {
      total++;
      const docxFile = mdFile.replace(/\.md$/, '.docx');
      const cmd = [
        'node',
        `"${path.join(ROOT, 'pandoc', 'generate.js')}"`,
        `"${mdFile}"`,
        '--version', opts.version,
        '-o', `"${docxFile}"`
      ].join(' ');

      try {
        execSync(cmd, { stdio: 'pipe', cwd: ROOT, env: { ...process.env, PATH: process.env.PATH + ';C:\\Users\\wakecap\\AppData\\Local\\Pandoc' } });
        console.log(`  OK: ${path.basename(docxFile)}`);
        success++;
      } catch (err) {
        console.error(`  FAIL: ${path.basename(mdFile)} — ${err.message.split('\n')[0]}`);
        failed++;
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`Total: ${total} | Success: ${success} | Failed: ${failed}`);

  if (failed > 0) process.exit(1);
}

main();
