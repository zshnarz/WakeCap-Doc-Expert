#!/usr/bin/env node
/**
 * WakeCap Universal Document Generator
 *
 * Generates a .docx document for any product/type combination using the
 * knowledge base and shared component library.
 *
 * Usage:
 *   node templates/generate.js --product weather-station --type PM --version B
 *   node templates/generate.js --product gateway --type DS
 *   node templates/generate.js --product power-solutions --type QR --version A
 *
 * Options:
 *   --product   Product name (kebab-case, matches knowledge-base filename)
 *   --type      Document type code (PM, DS, QR, IG, TG, etc.)
 *   --version   Style version: A (marketing) or B (technical). Default: B
 *   --toc       Include Table of Contents. Default: false
 *   --no-cover  Skip cover page generation
 *   --output    Custom output path (default: output/<product>/)
 */

const fs = require('fs');
const path = require('path');

const {
  DOCUMENT_TYPES, PRODUCT_CODES, PAGE_A4,
  buildDocument,
  Packer
} = require('./docx-generator');
const { parseMarkdownToDocx } = require('./markdown-parser');

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    product: null,
    type: null,
    version: 'B',
    toc: false,
    cover: true,
    output: null
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
      case '--no-cover':
        opts.cover = false;
        break;
      case '--output':
      case '-o':
        opts.output = args[++i];
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;
      default:
        console.error(`Unknown option: ${args[i]}`);
        printHelp();
        process.exit(1);
    }
  }

  return opts;
}

function printHelp() {
  console.log(`
WakeCap Universal Document Generator

Usage:
  node templates/generate.js --product <name> --type <code> [options]

Required:
  --product, -p   Product name (kebab-case, matches knowledge-base filename)
  --type, -t      Document type code

Options:
  --version, -v   Style version: A (marketing) or B (technical). Default: B
  --toc           Include Table of Contents
  --no-cover      Skip cover page
  --output, -o    Custom output path
  --help, -h      Show this help

Document Type Codes:
${Object.entries(DOCUMENT_TYPES).map(([code, info]) => `  ${code.padEnd(5)} ${info.name}`).join('\n')}

Product Codes:
${Object.entries(PRODUCT_CODES).map(([name, code]) => `  ${name.padEnd(20)} → ${code}`).join('\n')}

Examples:
  node templates/generate.js --product weather-station --type PM --version B
  node templates/generate.js --product gateway --type DS --toc
  node templates/generate.js --product power-solutions --type QR --version A
`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs();

  // Validate required args
  if (!opts.product) {
    console.error('ERROR: --product is required');
    printHelp();
    process.exit(1);
  }
  if (!opts.type) {
    console.error('ERROR: --type is required');
    printHelp();
    process.exit(1);
  }

  // Validate document type
  const docType = DOCUMENT_TYPES[opts.type];
  if (!docType) {
    console.error(`ERROR: Unknown document type "${opts.type}"`);
    console.error(`Valid types: ${Object.keys(DOCUMENT_TYPES).join(', ')}`);
    process.exit(1);
  }

  // Validate version
  if (!['A', 'B'].includes(opts.version)) {
    console.error(`ERROR: Version must be A or B, got "${opts.version}"`);
    process.exit(1);
  }

  // Resolve product code
  const productCode = PRODUCT_CODES[opts.product];
  if (!productCode) {
    console.error(`WARNING: No product code found for "${opts.product}". Using first 2 chars uppercase.`);
  }
  const pCode = productCode || opts.product.substring(0, 2).toUpperCase();

  // Build document ID
  const docVersion = '1.0';
  const docId = `WC-${pCode}-${opts.type}-v${docVersion}`;
  const revisionDate = new Date().toISOString().split('T')[0];

  // Read knowledge base
  const rootDir = path.resolve(__dirname, '..');
  const kbPath = path.join(rootDir, 'knowledge-base', `${opts.product}.md`);

  if (!fs.existsSync(kbPath)) {
    console.error(`ERROR: Knowledge base not found: ${kbPath}`);
    console.error(`Available knowledge bases:`);
    const kbDir = path.join(rootDir, 'knowledge-base');
    const files = fs.readdirSync(kbDir).filter(f => f.endsWith('.md') && f !== 'SCHEMA.md');
    files.forEach(f => console.error(`  - ${f.replace('.md', '')}`));
    process.exit(1);
  }

  console.log(`Reading knowledge base: ${kbPath}`);
  const kbContent = fs.readFileSync(kbPath, 'utf-8');

  // Parse knowledge base markdown to docx elements
  console.log(`Parsing markdown (Version ${opts.version})...`);
  const contentElements = parseMarkdownToDocx(kbContent, opts.version);

  // Format product name for display
  const productName = opts.product
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Build document
  console.log(`Building document: ${docId}`);
  const doc = buildDocument({
    docId,
    productName,
    docType: docType.name,
    version: opts.version,
    revisionDate,
    content: contentElements,
    includeCoverPage: opts.cover,
    includeTOC: opts.toc,
    metadata: {
      creator: 'WakeCap Technologies',
      title: `${productName} ${docType.name}`,
      subject: `WakeCap ${productName} - ${docType.name}`,
      keywords: `WakeCap, ${productName}, ${docType.name}, IoT, ${docType.category}`
    }
  });

  // Generate .docx
  const buffer = await Packer.toBuffer(doc);

  // Determine output path
  let outputPath;
  if (opts.output) {
    outputPath = path.resolve(opts.output);
  } else {
    const outputDir = path.join(rootDir, 'output', opts.product);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    outputPath = path.join(outputDir, `${docId}.docx`);
  }

  fs.writeFileSync(outputPath, buffer);
  console.log(`SUCCESS: ${outputPath}`);
  console.log(`  Product:  ${productName}`);
  console.log(`  Type:     ${docType.name} (${opts.type})`);
  console.log(`  Version:  ${opts.version}`);
  console.log(`  Doc ID:   ${docId}`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
