#!/usr/bin/env node
/**
 * WakeCap Cross-Reference Index Builder
 *
 * Scans knowledge-base markdown files, collects section headings, and
 * validates "See Section X.Y" cross-references. Produces a topic index
 * mapping headings to documents.
 *
 * Usage:
 *   node templates/xref-index.js                        # Build index for all KBs
 *   node templates/xref-index.js --product gateway      # Single product
 *   node templates/xref-index.js --validate             # Validate cross-refs only
 *   node templates/xref-index.js --json                 # Output JSON to stdout
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const kbDir = path.join(rootDir, 'knowledge-base');
const outputPath = path.join(rootDir, 'output', 'topic-index.json');

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { product: null, validate: false, json: false };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--product':
      case '-p':
        opts.product = args[++i];
        break;
      case '--validate':
        opts.validate = true;
        break;
      case '--json':
        opts.json = true;
        break;
      case '--help':
      case '-h':
        console.log(`
WakeCap Cross-Reference Index Builder

Usage:
  node templates/xref-index.js [options]

Options:
  --product, -p   Process a single product knowledge base
  --validate      Validate cross-references and report issues
  --json          Output topic index as JSON to stdout
  --help, -h      Show this help
`);
        process.exit(0);
    }
  }
  return opts;
}

// ---------------------------------------------------------------------------
// Section numbering & heading extraction
// ---------------------------------------------------------------------------

/**
 * Extract headings from markdown and assign section numbers.
 * Returns array of { level, number, title, line }
 */
function extractHeadings(mdContent) {
  const lines = mdContent.split('\n');
  const headings = [];
  const counters = [0, 0, 0, 0]; // H1, H2, H3, H4

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^(#{1,4})\s+(.+)/);
    if (!match) continue;

    const level = match[1].length;
    const title = match[2].trim();

    // Update counters
    counters[level - 1]++;
    // Reset lower-level counters
    for (let j = level; j < 4; j++) {
      counters[j] = 0;
    }

    // Build section number (e.g., "1", "1.2", "1.2.3")
    const number = counters.slice(0, level).join('.');

    headings.push({ level, number, title, line: i + 1 });
  }

  return headings;
}

/**
 * Extract cross-references like "See Section X.Y" from content.
 * Returns array of { ref, line }
 */
function extractCrossRefs(mdContent) {
  const lines = mdContent.split('\n');
  const refs = [];
  const pattern = /[Ss]ee\s+[Ss]ection\s+([\d]+(?:\.[\d]+)*)/g;

  for (let i = 0; i < lines.length; i++) {
    let match;
    while ((match = pattern.exec(lines[i])) !== null) {
      refs.push({ ref: match[1], line: i + 1 });
    }
  }

  return refs;
}

/**
 * Validate that all cross-references point to existing section numbers.
 */
function validateCrossRefs(headings, crossRefs) {
  const sectionNumbers = new Set(headings.map(h => h.number));
  const issues = [];

  for (const { ref, line } of crossRefs) {
    if (!sectionNumbers.has(ref)) {
      issues.push({
        severity: 'warning',
        line,
        message: `Cross-reference "See Section ${ref}" does not match any heading`
      });
    }
  }

  return issues;
}

// ---------------------------------------------------------------------------
// Topic index builder
// ---------------------------------------------------------------------------

/**
 * Build a topic index: mapping each heading title to the product(s) and
 * section number(s) where it appears.
 */
function buildTopicIndex(products) {
  const index = {};

  for (const { product, headings } of products) {
    for (const h of headings) {
      const key = h.title.toLowerCase();
      if (!index[key]) {
        index[key] = {
          title: h.title,
          occurrences: []
        };
      }
      index[key].occurrences.push({
        product,
        section: h.number,
        level: h.level
      });
    }
  }

  return index;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const opts = parseArgs();

  // Discover KB files
  let kbFiles;
  if (opts.product) {
    const kbPath = path.join(kbDir, `${opts.product}.md`);
    if (!fs.existsSync(kbPath)) {
      console.error(`ERROR: Knowledge base not found: ${kbPath}`);
      process.exit(1);
    }
    kbFiles = [{ product: opts.product, file: kbPath }];
  } else {
    kbFiles = fs.readdirSync(kbDir)
      .filter(f => f.endsWith('.md') && f !== 'SCHEMA.md')
      .map(f => ({ product: f.replace('.md', ''), file: path.join(kbDir, f) }));
  }

  if (kbFiles.length === 0) {
    console.error('No knowledge base files found.');
    process.exit(1);
  }

  const allProducts = [];
  let totalIssues = 0;

  for (const { product, file } of kbFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const headings = extractHeadings(content);
    const crossRefs = extractCrossRefs(content);
    const issues = validateCrossRefs(headings, crossRefs);

    allProducts.push({ product, headings, crossRefs, issues });

    if (!opts.json) {
      console.log(`\n${product} (${headings.length} headings, ${crossRefs.length} cross-refs)`);

      if (opts.validate && issues.length > 0) {
        for (const issue of issues) {
          const color = issue.severity === 'warning' ? '\x1b[33m' : '\x1b[31m';
          console.log(`  ${color}${issue.severity.toUpperCase()}\x1b[0m [line ${issue.line}]: ${issue.message}`);
        }
        totalIssues += issues.length;
      } else if (opts.validate) {
        console.log('  All cross-references valid.');
      }

      // Print heading tree
      if (!opts.validate) {
        for (const h of headings) {
          const indent = '  '.repeat(h.level);
          console.log(`  ${indent}${h.number} ${h.title}`);
        }
      }
    }
  }

  // Build topic index
  const topicIndex = buildTopicIndex(allProducts);

  // Find shared topics (same heading in multiple products)
  const sharedTopics = Object.values(topicIndex)
    .filter(t => {
      const products = new Set(t.occurrences.map(o => o.product));
      return products.size > 1;
    });

  if (opts.json) {
    const output = {
      generated: new Date().toISOString(),
      products: allProducts.map(p => ({
        product: p.product,
        headingCount: p.headings.length,
        crossRefCount: p.crossRefs.length,
        headings: p.headings
      })),
      topicIndex,
      sharedTopics: sharedTopics.map(t => ({
        title: t.title,
        products: t.occurrences.map(o => o.product)
      }))
    };
    console.log(JSON.stringify(output, null, 2));
  } else {
    // Save topic index to file
    const indexData = {
      generated: new Date().toISOString(),
      topicCount: Object.keys(topicIndex).length,
      sharedTopicCount: sharedTopics.length,
      topicIndex
    };

    fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2));
    console.log(`\nTopic index saved: ${outputPath}`);
    console.log(`  Total topics:  ${Object.keys(topicIndex).length}`);
    console.log(`  Shared topics: ${sharedTopics.length}`);

    if (sharedTopics.length > 0) {
      console.log('\n  Shared across products (single-source candidates):');
      for (const t of sharedTopics.slice(0, 15)) {
        const prods = [...new Set(t.occurrences.map(o => o.product))].join(', ');
        console.log(`    "${t.title}" → ${prods}`);
      }
      if (sharedTopics.length > 15) {
        console.log(`    ... and ${sharedTopics.length - 15} more`);
      }
    }

    if (opts.validate) {
      console.log(`\nValidation: ${totalIssues} issue(s) found.`);
    }
  }

  process.exit(opts.validate && totalIssues > 0 ? 1 : 0);
}

main();
