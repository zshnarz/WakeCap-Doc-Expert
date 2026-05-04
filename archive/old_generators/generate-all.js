#!/usr/bin/env node
/**
 * WakeCap Batch Document Generator
 *
 * Generates documents for all products and/or all document types.
 *
 * Usage:
 *   node templates/generate-all.js                          # All products, all types
 *   node templates/generate-all.js --product weather-station # All types for one product
 *   node templates/generate-all.js --type DS                 # One type for all products
 *   node templates/generate-all.js --version A               # Override style version
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const { DOCUMENT_TYPES, PRODUCT_CODES } = require('./docx-generator');

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    product: null,
    type: null,
    version: 'B',
    toc: false
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--product':
      case '-p':
        opts.product = args[++i];
        break;
      case '--type':
      case '-t':
        opts.type = args[++i]?.toUpperCase();
        break;
      case '--version':
      case '-v':
        opts.version = args[++i]?.toUpperCase();
        break;
      case '--toc':
        opts.toc = true;
        break;
      case '--help':
      case '-h':
        console.log(`
WakeCap Batch Document Generator

Usage:
  node templates/generate-all.js [options]

Options:
  --product, -p   Generate for specific product only
  --type, -t      Generate specific document type only
  --version, -v   Style version: A or B. Default: B
  --toc           Include Table of Contents
  --help, -h      Show this help
`);
        process.exit(0);
    }
  }

  return opts;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const opts = parseArgs();
  const rootDir = path.resolve(__dirname, '..');
  const kbDir = path.join(rootDir, 'knowledge-base');
  const generateScript = path.join(__dirname, 'generate.js');

  // Discover available products
  let products;
  if (opts.product) {
    products = [opts.product];
  } else {
    products = fs.readdirSync(kbDir)
      .filter(f => f.endsWith('.md') && f !== 'SCHEMA.md')
      .map(f => f.replace('.md', ''));
  }

  // Determine document types to generate
  let types;
  if (opts.type) {
    if (!DOCUMENT_TYPES[opts.type]) {
      console.error(`ERROR: Unknown type "${opts.type}"`);
      process.exit(1);
    }
    types = [opts.type];
  } else {
    types = Object.keys(DOCUMENT_TYPES);
  }

  console.log(`Batch generation starting...`);
  console.log(`  Products: ${products.join(', ')}`);
  console.log(`  Types:    ${types.join(', ')}`);
  console.log(`  Version:  ${opts.version}`);
  console.log('');

  let successCount = 0;
  let failCount = 0;
  const total = products.length * types.length;

  for (const product of products) {
    for (const type of types) {
      const label = `${product} / ${type}`;
      try {
        const args = [
          'node', generateScript,
          '--product', product,
          '--type', type,
          '--version', opts.version
        ];
        if (opts.toc) args.push('--toc');

        execSync(args.join(' '), {
          cwd: rootDir,
          stdio: ['pipe', 'pipe', 'pipe'],
          timeout: 30000
        });

        console.log(`  OK:   ${label}`);
        successCount++;
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString().split('\n')[0] : err.message;
        console.log(`  FAIL: ${label} — ${stderr}`);
        failCount++;
      }
    }
  }

  console.log(`\nBatch complete: ${successCount} succeeded, ${failCount} failed out of ${total} total.`);
  process.exit(failCount > 0 ? 1 : 0);
}

main();
