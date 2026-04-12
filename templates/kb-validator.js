#!/usr/bin/env node
/**
 * Knowledge Base Validator
 *
 * Validates knowledge base markdown files against the schema defined in
 * knowledge-base/SCHEMA.md. Checks for required sections, unit usage in
 * specifications, and other formatting rules.
 *
 * Usage:
 *   node templates/kb-validator.js knowledge-base/weather-station.md
 *   node templates/kb-validator.js                 # validates all KB files
 *
 * Exit codes:
 *   0 - No errors found (warnings may still be present)
 *   1 - One or more errors found
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Required sections - each entry has a name and an array of patterns that
// match acceptable heading text (case-insensitive).
// ---------------------------------------------------------------------------
const REQUIRED_SECTIONS = [
  {
    name: 'Product Identity',
    patterns: ['product identity', 'product overview'],
  },
  {
    name: 'Specifications',
    patterns: ['specifications', 'specs', 'sensor specifications', 'electrical specifications', 'environmental specifications'],
  },
  {
    name: 'Interfaces',
    patterns: ['interfaces', 'connections', 'wiring', 'communication'],
  },
  {
    name: 'Procedures',
    patterns: ['procedures', 'installation', 'configuration', 'maintenance', 'setup', 'field verification'],
  },
  {
    name: 'Safety Information',
    patterns: ['safety'],
  },
  {
    name: 'Troubleshooting',
    patterns: ['troubleshooting'],
  },
  {
    name: 'Glossary and Definitions',
    patterns: ['glossary', 'definitions'],
  },
];

// Common unit patterns that should appear near numbers in spec tables.
// We look for these after a numeric value.
const UNIT_PATTERN = /\d+(\.\d+)?\s*(V|A|W|Hz|kHz|MHz|GHz|m\/s|m|mm|cm|km|deg\s*C|°C|%|hPa|mbar|ppm|ug\/m3|µg\/m3|MOhm|mA|mV|dB|dBm|bits?|bytes?|pixels?|characters?|minutes?|min|seconds?|sec|hours?|hr|ms|days?|years?|kg|g|lbs?|ohm|Ohm|F\.S\.|mW|kW|inch|in|ft|feet)\b/i;

// Bare number pattern: a number that does NOT have a unit after it.
// Used in spec table rows to flag potential missing units.
const BARE_NUMBER = /\|\s*[-+]?\d+(\.\d+)?\s*\|/;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extract all markdown headings from content.
 * Supports # style headings only (not underline style).
 */
function extractHeadings(content) {
  const headings = [];
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)/);
    if (match) {
      headings.push({
        level: match[1].length,
        text: match[2].trim(),
      });
    }
  }
  return headings;
}

/**
 * Check whether any heading matches one of the patterns for a required section.
 */
function sectionFound(headings, section) {
  const lowerTexts = headings.map((h) => h.text.toLowerCase());
  return section.patterns.some((pattern) =>
    lowerTexts.some((text) => text.includes(pattern))
  );
}

/**
 * Find spec-like lines (table rows with numeric values) and check for units.
 * Returns an array of warning messages for lines where a number lacks a unit.
 */
function checkSpecUnits(content) {
  const warnings = [];
  const lines = content.split('\n');

  // We consider a line to be inside a specification context if it looks like
  // a table row (contains | separators) and has a number in it.
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip header separator rows like +----+----+
    if (/^\s*\+[-+]+\+\s*$/.test(line)) continue;
    // Skip markdown table separator rows like |---|---|
    if (/^\s*\|[\s\-:|]+\|\s*$/.test(line)) continue;
    // Skip lines that are headers or labels (no numbers)
    if (!/\d/.test(line)) continue;
    // Only check table-like rows
    if (!line.includes('|')) continue;

    // Extract the "value" cells (skip the first cell which is usually a label)
    const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
    if (cells.length < 2) continue;

    // Check value cells (all cells after the first label cell)
    for (let c = 1; c < cells.length; c++) {
      const cell = cells[c];
      // If cell contains a number, check it has a unit
      if (/\d/.test(cell) && !/^\s*[-+]+\s*$/.test(cell)) {
        // Skip cells that are purely structural (like line counts in tables)
        if (/^\d+$/.test(cell.trim()) && parseInt(cell.trim(), 10) < 20) continue;

        // Check if the cell contains a number with a recognizable unit
        if (UNIT_PATTERN.test(cell)) continue;

        // Check for some additional patterns that are valid:
        // - Percentages like +/-3%
        if (/\d+(\.\d+)?\s*%/.test(cell)) continue;
        // - Resolution like 192 x 64 pixels
        if (/\d+\s*x\s*\d+/.test(cell)) continue;
        // - Bit depth like 12-bit
        if (/\d+-bit/.test(cell)) continue;
        // - Address ranges like 0-255
        if (/address|id|version|model|number|date|report|no\./i.test(cells[0])) continue;
        // - Descriptive text with embedded numbers
        if (/[a-zA-Z]{3,}/.test(cell)) continue;

        warnings.push(
          `Line ${i + 1}: Possible spec without unit in table cell: "${cell.substring(0, 60)}"`
        );
      }
    }
  }

  return warnings;
}

/**
 * Check that model numbers are present in the document.
 */
function checkModelNumbers(content) {
  // Look for patterns like XX-XXX, XXXX-XX, or alphanumeric model codes
  const modelPattern = /[A-Z]{2,}[-_][\w]+([-_][\w]+)*/;
  return modelPattern.test(content);
}

// ---------------------------------------------------------------------------
// Main validation function
// ---------------------------------------------------------------------------

function validateFile(filePath) {
  const errors = [];
  const warnings = [];
  const info = [];

  const absolutePath = path.resolve(filePath);
  const fileName = path.basename(filePath);

  // Skip SCHEMA.md itself
  if (fileName === 'SCHEMA.md') {
    return { filePath: absolutePath, errors, warnings, info, skipped: true };
  }

  let content;
  try {
    content = fs.readFileSync(absolutePath, 'utf-8');
  } catch (err) {
    errors.push(`Cannot read file: ${err.message}`);
    return { filePath: absolutePath, errors, warnings, info };
  }

  if (!content.trim()) {
    errors.push('File is empty');
    return { filePath: absolutePath, errors, warnings, info };
  }

  // --- Check for top-level heading ---
  const headings = extractHeadings(content);
  const hasTopHeading = headings.some((h) => h.level === 1);
  if (!hasTopHeading) {
    warnings.push('Missing top-level heading (# Title)');
  }

  // --- Check required sections ---
  for (const section of REQUIRED_SECTIONS) {
    if (!sectionFound(headings, section)) {
      errors.push(`Missing required section: "${section.name}"`);
    }
  }

  // --- Check spec units ---
  const unitWarnings = checkSpecUnits(content);
  warnings.push(...unitWarnings);

  // --- Check for model numbers ---
  if (!checkModelNumbers(content)) {
    warnings.push('No model numbers detected in the document');
  }

  // --- Check for TBD placeholders (informational) ---
  const tbdMatches = content.match(/\[TBD\]/gi);
  if (tbdMatches) {
    info.push(`Found ${tbdMatches.length} [TBD] placeholder(s) that need resolution`);
  }

  // --- Check for old-style headers (=== or --- underlines) ---
  if (/^[=]{3,}\s*$/m.test(content)) {
    warnings.push('File uses === underline-style headers. Convert to # markdown headers.');
  }
  if (/^[-]{3,}\s*$/m.test(content) && !/^\s*\|/.test(content)) {
    // Only warn if --- lines are not part of tables
    const lines = content.split('\n');
    let underlineHeaderFound = false;
    for (let i = 1; i < lines.length; i++) {
      if (/^[-]{3,}\s*$/.test(lines[i]) && /\S/.test(lines[i - 1]) && !/\|/.test(lines[i - 1]) && !/^#/.test(lines[i - 1])) {
        underlineHeaderFound = true;
        break;
      }
    }
    if (underlineHeaderFound) {
      warnings.push('File uses --- underline-style headers. Convert to ## markdown headers.');
    }
  }

  return { filePath: absolutePath, errors, warnings, info };
}

// ---------------------------------------------------------------------------
// Output formatting
// ---------------------------------------------------------------------------

function printResults(result) {
  if (result.skipped) return;

  const relPath = path.relative(process.cwd(), result.filePath);
  console.log(`\n${'='.repeat(70)}`);
  console.log(`  Validating: ${relPath}`);
  console.log('='.repeat(70));

  if (result.errors.length === 0 && result.warnings.length === 0 && result.info.length === 0) {
    console.log('  ✓ All checks passed.');
  }

  for (const msg of result.errors) {
    console.log(`  ERROR:   ${msg}`);
  }
  for (const msg of result.warnings) {
    console.log(`  WARNING: ${msg}`);
  }
  for (const msg of result.info) {
    console.log(`  INFO:    ${msg}`);
  }

  console.log(`\n  Summary: ${result.errors.length} error(s), ${result.warnings.length} warning(s), ${result.info.length} info message(s)`);
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2);
  let files = [];

  if (args.length > 0) {
    // Validate specific file(s)
    files = args.map((f) => path.resolve(f));
  } else {
    // Validate all .md files in knowledge-base/
    const kbDir = path.resolve(__dirname, '..', 'knowledge-base');
    try {
      const entries = fs.readdirSync(kbDir);
      files = entries
        .filter((f) => f.endsWith('.md') && f !== 'SCHEMA.md')
        .map((f) => path.join(kbDir, f));
    } catch (err) {
      console.error(`Cannot read knowledge-base directory: ${err.message}`);
      process.exit(1);
    }

    if (files.length === 0) {
      console.log('No knowledge base files found to validate.');
      process.exit(0);
    }
  }

  let totalErrors = 0;
  let totalWarnings = 0;
  let totalInfo = 0;

  for (const file of files) {
    const result = validateFile(file);
    if (!result.skipped) {
      printResults(result);
      totalErrors += result.errors.length;
      totalWarnings += result.warnings.length;
      totalInfo += result.info.length;
    }
  }

  // Final summary
  console.log(`\n${'='.repeat(70)}`);
  console.log(`  TOTAL: ${totalErrors} error(s), ${totalWarnings} warning(s), ${totalInfo} info message(s)`);
  console.log(`  Files validated: ${files.length}`);
  console.log('='.repeat(70));

  process.exit(totalErrors > 0 ? 1 : 0);
}

main();
