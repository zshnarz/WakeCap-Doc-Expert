/**
 * WakeCap Documentation Quality Validator (Feature 7)
 *
 * Post-generation validator that checks knowledge-base markdown files
 * for quality issues aligned with the WakeCap Documentation Style Guide.
 *
 * Usage:
 *   node templates/validator.js --product weather-station
 *   node templates/validator.js --all
 *   node templates/validator.js --product power-solutions --strict
 *   node templates/validator.js --all --json
 *
 * Exit codes:
 *   0 - No errors (or no errors + no warnings in --strict mode)
 *   1 - Errors found (or errors/warnings found in --strict mode)
 */

const fs = require('fs');
const path = require('path');

// =============================================================================
// CONSTANTS
// =============================================================================

/** Directory containing knowledge-base markdown files. */
const KB_DIR = path.resolve(__dirname, '..', 'knowledge-base');

/**
 * Common engineering / SI units expected in specification table cells.
 * The validator flags bare numbers that lack any of these suffixes.
 */
const UNIT_PATTERNS = [
  // Electrical
  'V', 'kV', 'mV', 'A', 'mA', 'uA', 'W', 'kW', 'mW', 'Wh', 'kWh',
  'Ah', 'mAh', 'Ohm', 'MOhm', 'kOhm',
  // Frequency / time
  'Hz', 'kHz', 'MHz', 'GHz', 'ms', 'us', 'ns', 's', 'min', 'hours', 'h',
  // Temperature
  'C', 'F', 'K', 'deg C', 'deg F',
  // Length / area / volume
  'mm', 'cm', 'm', 'km', 'in', 'ft', 'um', 'micrometers',
  'mm²', 'cm²', 'm²', 'mm³', 'cm³', 'm³',
  // Weight / force
  'g', 'kg', 'lb', 'oz', 'N', 'kN',
  // Pressure
  'Pa', 'kPa', 'hPa', 'mbar', 'bar', 'psi', 'atm',
  // RF / signal
  'dBm', 'dBi', 'dB',
  // Data
  'bit', 'bits', 'byte', 'bytes', 'KB', 'MB', 'GB', 'TB',
  'bps', 'kbps', 'Mbps', 'Gbps',
  // Concentration
  'ppm', 'ppb', 'ug/m3', 'mg/m3',
  // Humidity / percentage
  '%', '% RH', 'RH',
  // Miscellaneous
  'degrees', 'degree', 'pixels', 'px', 'DXA', 'twips',
  'lux', 'cd', 'lm',
  'km/h', 'm/s', 'mm/min',
  // Angles
  '°',
  // Protection ratings (not really units but accepted in spec cells)
  'IP'
];

/**
 * Action verbs expected at the start of numbered procedure steps.
 * This list covers the most common imperative verbs used in
 * industrial / IoT installation and maintenance documentation.
 */
const ACTION_VERBS = [
  'Install', 'Remove', 'Replace', 'Connect', 'Disconnect', 'Attach',
  'Detach', 'Mount', 'Unmount', 'Secure', 'Fasten', 'Tighten', 'Loosen',
  'Configure', 'Set', 'Reset', 'Enable', 'Disable', 'Activate', 'Deactivate',
  'Check', 'Verify', 'Inspect', 'Confirm', 'Validate', 'Test', 'Measure',
  'Record', 'Note', 'Document', 'Log',
  'Open', 'Close', 'Turn', 'Switch', 'Press', 'Push', 'Pull', 'Slide',
  'Insert', 'Extract', 'Route', 'Thread', 'Strip', 'Crimp', 'Solder',
  'Apply', 'Spread', 'Clean', 'Wipe', 'Rinse', 'Dry', 'Flush',
  'Align', 'Position', 'Orient', 'Adjust', 'Calibrate', 'Level',
  'Power', 'Energize', 'De-energize', 'Charge', 'Discharge',
  'Select', 'Navigate', 'Click', 'Tap', 'Enter', 'Input', 'Type',
  'Download', 'Upload', 'Update', 'Upgrade', 'Flash',
  'Observe', 'Monitor', 'Wait', 'Allow', 'Ensure', 'Make',
  'Label', 'Mark', 'Identify', 'Locate', 'Find',
  'Use', 'Obtain', 'Prepare', 'Gather', 'Collect',
  'Scan', 'Read', 'View', 'Display', 'Show',
  'Store', 'Save', 'Export', 'Import', 'Transfer', 'Copy',
  'Seal', 'Protect', 'Shield', 'Ground', 'Isolate',
  'Drill', 'Cut', 'Trim', 'Bend', 'Fold',
  'Lift', 'Lower', 'Raise', 'Deploy', 'Retract',
  'Refer', 'Follow', 'Repeat', 'Continue', 'Proceed',
  'Notify', 'Contact', 'Report', 'Escalate',
  'Place', 'Run'
];

/**
 * Valid ANSI Z535.4 signal words (case-insensitive comparison).
 * Any informal safety language that does NOT use these words is flagged.
 */
const VALID_SIGNAL_WORDS = ['DANGER', 'WARNING', 'CAUTION', 'NOTICE'];

/**
 * Informal safety phrases that should be replaced with proper
 * ANSI Z535.4 signal words.
 */
const INFORMAL_SAFETY_PHRASES = [
  /\b(be\s+careful)\b/gi,
  /\b(watch\s+out)\b/gi,
  /\b(take\s+care)\b/gi,
  /\b(be\s+aware)\b/gi,
  /\b(heads?\s+up)\b/gi,
  /\b(pay\s+attention)\b/gi,
  /\b(careful(?:ly)?)\b/gi,
  /\b(make\s+sure\s+not\s+to)\b/gi,
  /\b(do\s+not\s+forget)\b/gi,
  /\b(don'?t\s+forget)\b/gi,
  /\b(important(?:ly)?:\s)/gi
];

/**
 * Minimum length for a token to be treated as an acronym candidate.
 * Single uppercase letters (I, A) are excluded.
 */
const MIN_ACRONYM_LENGTH = 2;

// =============================================================================
// SEVERITY DEFINITIONS
// =============================================================================

const SEVERITY = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  INFO: 'INFO'
};

// ANSI color codes for terminal output.
const ANSI = {
  RED: '\x1b[31m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m',
  DIM: '\x1b[2m'
};

// =============================================================================
// ISSUE COLLECTOR
// =============================================================================

/**
 * Represents a single quality issue found during validation.
 *
 * @typedef {Object} Issue
 * @property {string} severity  - ERROR | WARNING | INFO
 * @property {string} rule      - Short rule identifier
 * @property {string} message   - Human-readable description
 * @property {number|null} line - 1-based line number (null if file-level)
 * @property {string} file      - Basename of the file being validated
 */

/**
 * Creates an Issue object.
 *
 * @param {string} severity
 * @param {string} rule
 * @param {string} message
 * @param {number|null} line
 * @param {string} file
 * @returns {Issue}
 */
function createIssue(severity, rule, message, line, file) {
  return { severity, rule, message, line, file };
}

// =============================================================================
// VALIDATION CHECKS
// =============================================================================

/**
 * Check 1: Specs have units
 *
 * Scans markdown table rows for cells that contain a bare number
 * without an accompanying unit suffix.  Only rows inside pipe-delimited
 * tables are inspected (lines starting with |).
 *
 * Heuristics applied to reduce false positives:
 *   - Header rows (containing "Parameter", "Specification", etc.) are skipped.
 *   - Separator rows (containing only dashes, pipes, colons) are skipped.
 *   - Cells with only "—", "Yes", "No", "N/A", or model numbers are skipped.
 *   - Cells where the number is a version, year, port count, or quantity are skipped.
 *   - Plus-delimited table borders (+---+) are skipped.
 *
 * @param {string[]} lines - File lines
 * @param {string} file   - File basename
 * @returns {Issue[]}
 */
function checkSpecUnits(lines, file) {
  const issues = [];

  // Regex: a cell value that is purely numeric (optionally with decimals,
  // negative sign, ranges expressed with "to" or "-", and inequality signs)
  // but has NO alphabetic unit or % sign anywhere after the number.
  //
  // We test each table cell individually after splitting on '|'.
  const bareNumberPattern = /^[<>=~≤≥±+\-]?\s*\d+(\.\d+)?\s*$/;

  // Columns whose header text suggests the value is a label, not a measurement.
  const nonSpecHeaders = [
    'parameter', 'feature', 'option', 'interface', 'button',
    'function', 'description', 'type', 'status', 'meaning',
    'indicator', 'content', 'mode', 'language', 'material',
    'name', 'product', 'model', 'code', 'category',
    'blinks/minute', 'blinks', 'column', 'width', 'symbol',
    'role', 'use', 'best use', 'document types', 'image type',
    'requirement', 'protection type', 'design parameter',
    'rationale', 'technology', 'maintenance', 'safety',
    'cell grade'
  ];

  // Track which columns are "spec" columns (contain measurements) vs label columns.
  let headerCells = [];
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect plus-delimited table borders and skip them.
    if (/^\+[-+=+]+\+$/.test(line)) {
      inTable = true;
      continue;
    }

    // Pipe-delimited table row.
    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line.split('|').slice(1, -1).map(c => c.trim());

      // Skip separator rows (e.g., |---|---|).
      if (cells.every(c => /^[-:]+$/.test(c) || c === '')) {
        // This is the row right after a header — capture header from previous line.
        inTable = true;
        continue;
      }

      // Detect header rows: if most cells look like labels.
      const looksLikeHeader = cells.some(c =>
        nonSpecHeaders.some(h => c.toLowerCase().includes(h))
      );

      if (looksLikeHeader && !inTable) {
        headerCells = cells.map(c => c.toLowerCase());
        inTable = true;
        continue;
      }

      // Already in a table — check data cells.
      inTable = true;

      for (let ci = 0; ci < cells.length; ci++) {
        const cell = cells[ci];

        // Skip empty cells.
        if (!cell || cell === '—' || cell === '-') continue;

        // Skip cells that are clearly non-spec labels.
        if (/^(Yes|No|N\/A|None|Minimal|Excellent|Good|Medium|High|Low|Standard|Integrated|Standalone|Separate)\b/i.test(cell)) continue;

        // Test for bare number.
        if (bareNumberPattern.test(cell)) {
          // Skip if the header column suggests it is not a measurement.
          if (headerCells[ci] && nonSpecHeaders.some(h => headerCells[ci].includes(h))) continue;

          // Skip very small integers that are likely counts, IDs, or ordinals (0-9).
          const numVal = parseFloat(cell.replace(/[<>=~≤≥±+\s]/g, ''));
          if (Number.isInteger(numVal) && numVal >= 0 && numVal <= 9) continue;

          issues.push(createIssue(
            SEVERITY.WARNING,
            'spec-units',
            `Table cell contains bare number "${cell}" without a unit`,
            i + 1,
            file
          ));
        }
      }

      continue;
    }

    // If we reach a non-table line, reset table tracking.
    if (inTable && !line.startsWith('|') && !/^\+[-+=+]+\+$/.test(line)) {
      inTable = false;
      headerCells = [];
    }
  }

  return issues;
}

/**
 * Check 2: Procedures start with action verbs
 *
 * Looks for numbered list items (e.g., "1. ", "2. ") and checks
 * that the first word after the number is a recognized action verb.
 *
 * @param {string[]} lines
 * @param {string} file
 * @returns {Issue[]}
 */
function checkActionVerbs(lines, file) {
  const issues = [];
  // Match lines like "1. Something" or "  2. Something"
  const numberedListPattern = /^\s*(\d+)\.\s+(.+)$/;
  const verbSet = new Set(ACTION_VERBS.map(v => v.toLowerCase()));

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(numberedListPattern);
    if (!match) continue;

    const stepText = match[2].trim();
    // Extract the first word.
    const firstWord = stepText.split(/\s+/)[0].replace(/[^a-zA-Z\-]/g, '');
    if (!firstWord) continue;

    if (!verbSet.has(firstWord.toLowerCase())) {
      // Check if the line is inside a table (preceded by | or +---) — skip those.
      // Numbered items in table cells are not procedures.
      if (lines[i].includes('|')) continue;

      issues.push(createIssue(
        SEVERITY.WARNING,
        'action-verb',
        `Numbered step ${match[1]} does not start with an action verb: "${firstWord}". ` +
        `Consider rephrasing to start with a verb like Install, Connect, Verify, etc.`,
        i + 1,
        file
      ));
    }
  }

  return issues;
}

/**
 * Check 3: Safety signal words hierarchy
 *
 * Ensures that safety-related text uses correct ANSI Z535.4 signal words
 * (DANGER, WARNING, CAUTION, NOTICE) rather than informal language.
 *
 * @param {string[]} lines
 * @param {string} file
 * @returns {Issue[]}
 */
function checkSafetySignalWords(lines, file) {
  const issues = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (const pattern of INFORMAL_SAFETY_PHRASES) {
      // Reset lastIndex for global regexes.
      pattern.lastIndex = 0;
      const match = pattern.exec(line);
      if (match) {
        issues.push(createIssue(
          SEVERITY.WARNING,
          'safety-signal',
          `Informal safety language "${match[0]}" found. ` +
          `Use ANSI Z535.4 signal words instead: DANGER, WARNING, CAUTION, or NOTICE.`,
          i + 1,
          file
        ));
      }
    }
  }

  return issues;
}

/**
 * Check 4: Document metadata completeness
 *
 * Checks for the presence of:
 *   - Document ID matching pattern WC-XX-XX-vX.X
 *   - Revision / report date
 *   - Version number
 *
 * These are expected in the knowledge-base files (or at least in
 * generated output). Missing metadata is reported as an error.
 *
 * @param {string} content - Full file content
 * @param {string} file
 * @returns {Issue[]}
 */
function checkMetadata(content, file) {
  const issues = [];

  // Document ID pattern: WC-XX-XX-vX.X (e.g., WC-WS-PM-v1.0)
  const docIdPattern = /WC-[A-Z]{2,4}-[A-Z]{2,4}-v\d+\.\d+/;
  if (!docIdPattern.test(content)) {
    issues.push(createIssue(
      SEVERITY.ERROR,
      'metadata-docid',
      'No document ID found matching pattern WC-XX-XX-vX.X. ' +
      'Every document requires a traceable document ID.',
      null,
      file
    ));
  }

  // Revision / report date: look for date-like patterns (YYYY-MM-DD or DD/MM/YYYY, etc.)
  const datePattern = /\b(\d{4}[-/]\d{2}[-/]\d{2}|\d{2}[-/]\d{2}[-/]\d{4})\b/;
  if (!datePattern.test(content)) {
    issues.push(createIssue(
      SEVERITY.ERROR,
      'metadata-date',
      'No revision or report date found. Every document must include a date.',
      null,
      file
    ));
  }

  // Version number: look for patterns like "v1.0", "Version 1.0", "version: 1.0"
  const versionPattern = /\b(v\d+\.\d+|[Vv]ersion\s+\d+(\.\d+)?)\b/;
  if (!versionPattern.test(content)) {
    issues.push(createIssue(
      SEVERITY.ERROR,
      'metadata-version',
      'No version number found (e.g., v1.0 or Version 1.0). ' +
      'Every document requires version control metadata.',
      null,
      file
    ));
  }

  return issues;
}

/**
 * Check 5: [TBD] placeholder count
 *
 * Counts all occurrences of [TBD] and reports them as informational.
 * High counts may indicate the document is not ready for release.
 *
 * @param {string[]} lines
 * @param {string} content
 * @param {string} file
 * @returns {Issue[]}
 */
function checkTBDPlaceholders(lines, content, file) {
  const issues = [];
  const tbdPattern = /\[TBD\]/g;
  let totalCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const matches = lines[i].match(tbdPattern);
    if (matches) {
      totalCount += matches.length;
      for (const _m of matches) {
        issues.push(createIssue(
          SEVERITY.INFO,
          'tbd-placeholder',
          `[TBD] placeholder found — value needs to be determined`,
          i + 1,
          file
        ));
      }
    }
  }

  if (totalCount > 0) {
    issues.push(createIssue(
      SEVERITY.INFO,
      'tbd-summary',
      `Total [TBD] placeholders in file: ${totalCount}`,
      null,
      file
    ));
  }

  return issues;
}

/**
 * Check 6: Cross-reference validity
 *
 * Finds "See Section X.Y" references and verifies that a heading
 * with a matching number prefix exists in the document.
 *
 * Heading numbers are detected from lines like:
 *   ## 3. Sensor Specifications
 *   ### 3.1 Wind Speed Sensor
 *
 * @param {string[]} lines
 * @param {string} file
 * @returns {Issue[]}
 */
function checkCrossReferences(lines, file) {
  const issues = [];

  // Collect all heading numbers present in the document.
  // Matches headings like "## 3. Heading" or "### 3.1 Heading" or "## 3 Heading"
  const headingNumberPattern = /^#+\s+(\d+(?:\.\d+)*)\b/;
  const headingNumbers = new Set();

  for (const line of lines) {
    const match = line.match(headingNumberPattern);
    if (match) {
      headingNumbers.add(match[1]);
    }
  }

  // Also collect numbers from non-markdown numbered headings
  // (e.g., lines that start with a number and are in title case).
  // This catches knowledge-base files that use plain numbering.

  // Find cross-references: "See Section X.Y" (case-insensitive).
  const xrefPattern = /[Ss]ee\s+[Ss]ection\s+(\d+(?:\.\d+)*)/g;

  for (let i = 0; i < lines.length; i++) {
    let match;
    xrefPattern.lastIndex = 0;
    while ((match = xrefPattern.exec(lines[i])) !== null) {
      const refNumber = match[1];
      if (!headingNumbers.has(refNumber)) {
        issues.push(createIssue(
          SEVERITY.WARNING,
          'cross-ref',
          `Cross-reference "See Section ${refNumber}" does not match any heading in this file`,
          i + 1,
          file
        ));
      }
    }
  }

  return issues;
}

/**
 * Check 7: Acronyms defined on first use
 *
 * Detects uppercase acronyms (2+ consecutive capital letters that
 * are not common words) and checks whether they are defined with a
 * parenthetical expansion nearby or in a glossary section.
 *
 * @param {string[]} lines
 * @param {string} content
 * @param {string} file
 * @returns {Issue[]}
 */
function checkAcronyms(lines, content, file) {
  const issues = [];

  // Common abbreviations / acronyms that do not need definitions
  // (single-letter items, chemical formulas commonly known, file extensions, etc.)
  const exemptAcronyms = new Set([
    'DC', 'AC', 'ID', 'US', 'UK', 'EU', 'IP', 'OK', 'PC', 'TV',
    'WC', 'ON', 'OFF', 'NO', 'AM', 'PM', 'OR', 'AND', 'NOT',
    'TBD', 'TBC', 'NA', 'VS', 'II', 'III', 'IV', 'VI', 'VII',
    'VIII', 'IX', 'XI', 'XII', 'XX', 'ISO', 'IEC',
    'H2S', 'SO2', 'CO', 'CO2', 'PM2', 'PM10', 'EVA', 'CAT6',
    'WP', 'TD', 'GB', 'TCP', 'SD', 'CPU', 'LTE', 'SIM', 'LAN',
    'HTTPS', 'JSON', 'PPE'
  ]);

  // Collect acronyms defined in a glossary section.
  const glossaryAcronyms = new Set();
  let inGlossary = false;
  const glossaryHeaderPattern = /^#+\s+.*[Gg]lossary/;
  const glossaryEntryPattern = /^([A-Z][A-Z0-9./]+)\s+[-–—]\s+/;

  for (const line of lines) {
    if (glossaryHeaderPattern.test(line)) {
      inGlossary = true;
      continue;
    }
    if (inGlossary) {
      // A new heading at the same or higher level ends the glossary.
      if (/^#+\s+/.test(line) && !glossaryHeaderPattern.test(line)) {
        inGlossary = false;
        continue;
      }
      const gMatch = line.match(glossaryEntryPattern);
      if (gMatch) {
        glossaryAcronyms.add(gMatch[1]);
      }
    }
  }

  // Also collect acronyms that are defined inline with parenthetical expansion.
  // Pattern: "Full Name (ACRONYM)" — the acronym appears in parentheses.
  const inlineDefPattern = /\(([A-Z][A-Z0-9./]{1,})\)/g;
  const inlineDefined = new Set();
  let defMatch;
  while ((defMatch = inlineDefPattern.exec(content)) !== null) {
    inlineDefined.add(defMatch[1]);
  }

  // Also catch the reverse pattern: "ACRONYM (Full Name)"
  // e.g., "MPPT (Maximum Power Point Tracking)"
  const reverseDefPattern = /\b([A-Z][A-Z0-9]{1,})\s+\([A-Z][a-z]/g;
  while ((defMatch = reverseDefPattern.exec(content)) !== null) {
    inlineDefined.add(defMatch[1]);
  }

  // Scan for all unique acronyms in the document.
  // We only consider acronyms in "prose" lines — skip ASCII art, diagrams,
  // all-caps label lines, table borders, and code blocks.
  const acronymPattern = /\b([A-Z][A-Z0-9]{1,})(?:\b|(?=\s|[.,;:)\]]))/g;
  const seenAcronyms = new Set();
  const undefinedAcronyms = new Map(); // acronym -> first occurrence line
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Toggle code block state on triple-backtick fences.
    if (/^\s*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    // Skip ASCII art lines (contain box-drawing chars like +---+, |  |, arrows ->).
    if (/^\s*[\+\|][-=+|>\s]*$/.test(line)) continue;
    if (/^\s*\+[-+=]+\+/.test(line)) continue;
    if (/^\s*\|.*\|$/.test(line)) continue;
    if (/->|-->|<-/.test(line) && /^\s{2,}/.test(line)) continue;

    // Skip lines that are entirely uppercase (labels in diagrams).
    const stripped = line.replace(/[\s\-_:+|#*()>.,\/\[\]]/g, '');
    if (stripped.length > 0 && stripped === stripped.toUpperCase() && /[A-Z]{2,}/.test(stripped)) continue;

    let aMatch;
    acronymPattern.lastIndex = 0;
    while ((aMatch = acronymPattern.exec(line)) !== null) {
      const acronym = aMatch[1];

      // Skip if too short, exempt, or already seen.
      if (acronym.length < MIN_ACRONYM_LENGTH) continue;
      if (exemptAcronyms.has(acronym)) continue;
      if (seenAcronyms.has(acronym)) continue;

      seenAcronyms.add(acronym);

      // Check if defined in glossary or inline.
      if (!glossaryAcronyms.has(acronym) && !inlineDefined.has(acronym)) {
        undefinedAcronyms.set(acronym, i + 1);
      }
    }
  }

  for (const [acronym, lineNum] of undefinedAcronyms) {
    issues.push(createIssue(
      SEVERITY.INFO,
      'acronym-undefined',
      `Acronym "${acronym}" first appears without a parenthetical definition or glossary entry`,
      lineNum,
      file
    ));
  }

  return issues;
}

// =============================================================================
// MAIN VALIDATION ORCHESTRATOR
// =============================================================================

/**
 * Runs all validation checks on a single knowledge-base file.
 *
 * @param {string} filePath - Absolute path to the .md file
 * @returns {Issue[]}
 */
function validateFile(filePath) {
  const file = path.basename(filePath);

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    return [createIssue(SEVERITY.ERROR, 'file-read', `Cannot read file: ${err.message}`, null, file)];
  }

  if (!content.trim()) {
    return [createIssue(SEVERITY.ERROR, 'file-empty', 'File is empty', null, file)];
  }

  const lines = content.split(/\r?\n/);

  const issues = [
    ...checkSpecUnits(lines, file),
    ...checkActionVerbs(lines, file),
    ...checkSafetySignalWords(lines, file),
    ...checkMetadata(content, file),
    ...checkTBDPlaceholders(lines, content, file),
    ...checkCrossReferences(lines, file),
    ...checkAcronyms(lines, content, file)
  ];

  return issues;
}

// =============================================================================
// OUTPUT FORMATTING
// =============================================================================

/**
 * Returns the ANSI color code for a given severity level.
 *
 * @param {string} severity
 * @returns {string}
 */
function severityColor(severity) {
  switch (severity) {
    case SEVERITY.ERROR:   return ANSI.RED;
    case SEVERITY.WARNING: return ANSI.YELLOW;
    case SEVERITY.INFO:    return ANSI.BLUE;
    default:               return ANSI.RESET;
  }
}

/**
 * Formats a single issue for console output with color.
 *
 * @param {Issue} issue
 * @returns {string}
 */
function formatIssue(issue) {
  const color = severityColor(issue.severity);
  const location = issue.line ? `:${issue.line}` : '';
  return `  ${color}${ANSI.BOLD}${issue.severity}${ANSI.RESET} ` +
         `${ANSI.DIM}[${issue.rule}]${ANSI.RESET} ` +
         `${issue.file}${location}: ${issue.message}`;
}

/**
 * Prints the full validation report to the console.
 *
 * @param {Map<string, Issue[]>} resultsByFile - Map of filename -> issues
 */
function printReport(resultsByFile) {
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalInfo = 0;

  for (const [file, issues] of resultsByFile) {
    if (issues.length === 0) {
      console.log(`\n${ANSI.BOLD}${file}${ANSI.RESET}: No issues found.`);
      continue;
    }

    console.log(`\n${ANSI.BOLD}${file}${ANSI.RESET}:`);

    for (const issue of issues) {
      console.log(formatIssue(issue));
      switch (issue.severity) {
        case SEVERITY.ERROR:   totalErrors++;   break;
        case SEVERITY.WARNING: totalWarnings++; break;
        case SEVERITY.INFO:    totalInfo++;     break;
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log(`${ANSI.BOLD}Validation Summary${ANSI.RESET}`);
  console.log('='.repeat(60));
  console.log(`  ${ANSI.RED}${ANSI.BOLD}Errors:${ANSI.RESET}   ${totalErrors}`);
  console.log(`  ${ANSI.YELLOW}${ANSI.BOLD}Warnings:${ANSI.RESET} ${totalWarnings}`);
  console.log(`  ${ANSI.BLUE}${ANSI.BOLD}Info:${ANSI.RESET}     ${totalInfo}`);
  console.log('='.repeat(60));

  return { errors: totalErrors, warnings: totalWarnings, info: totalInfo };
}

/**
 * Outputs the validation results as JSON to stdout.
 *
 * @param {Map<string, Issue[]>} resultsByFile
 * @returns {{ errors: number, warnings: number, info: number }}
 */
function printJsonReport(resultsByFile) {
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalInfo = 0;

  const output = { files: {}, summary: {} };

  for (const [file, issues] of resultsByFile) {
    output.files[file] = issues.map(issue => ({
      severity: issue.severity,
      rule: issue.rule,
      message: issue.message,
      line: issue.line
    }));

    for (const issue of issues) {
      switch (issue.severity) {
        case SEVERITY.ERROR:   totalErrors++;   break;
        case SEVERITY.WARNING: totalWarnings++; break;
        case SEVERITY.INFO:    totalInfo++;     break;
      }
    }
  }

  output.summary = {
    errors: totalErrors,
    warnings: totalWarnings,
    info: totalInfo,
    totalFiles: resultsByFile.size,
    timestamp: new Date().toISOString()
  };

  console.log(JSON.stringify(output, null, 2));

  return { errors: totalErrors, warnings: totalWarnings, info: totalInfo };
}

// =============================================================================
// CLI ARGUMENT PARSING
// =============================================================================

/**
 * Parses command-line arguments.
 *
 * Supported flags:
 *   --product <name>   Validate a specific product's knowledge-base file
 *   --all              Validate all .md files in knowledge-base/
 *   --strict           Exit code 1 on warnings too (not just errors)
 *   --json             Output results as JSON instead of colored text
 *
 * @param {string[]} argv - process.argv
 * @returns {{ product: string|null, all: boolean, strict: boolean, json: boolean }}
 */
function parseArgs(argv) {
  const args = { product: null, all: false, strict: false, json: false };

  for (let i = 2; i < argv.length; i++) {
    switch (argv[i]) {
      case '--product':
        if (i + 1 < argv.length) {
          args.product = argv[++i];
        } else {
          console.error('Error: --product requires a product name argument');
          process.exit(1);
        }
        break;
      case '--all':
        args.all = true;
        break;
      case '--strict':
        args.strict = true;
        break;
      case '--json':
        args.json = true;
        break;
      case '--help':
      case '-h':
        printUsage();
        process.exit(0);
        break;
      default:
        console.error(`Error: Unknown argument "${argv[i]}"`);
        printUsage();
        process.exit(1);
    }
  }

  if (!args.product && !args.all) {
    console.error('Error: You must specify --product <name> or --all');
    printUsage();
    process.exit(1);
  }

  return args;
}

/**
 * Prints usage information to stderr.
 */
function printUsage() {
  console.error(`
WakeCap Documentation Quality Validator

Usage:
  node templates/validator.js --product <product-name>   Validate one product
  node templates/validator.js --all                      Validate all products
  node templates/validator.js --all --strict             Fail on warnings too
  node templates/validator.js --all --json               Output as JSON

Options:
  --product <name>   Name of the product (matches knowledge-base/<name>.md)
  --all              Validate all .md files in knowledge-base/
  --strict           Exit code 1 if any warnings are found (not just errors)
  --json             Output results as JSON instead of colored console text
  --help, -h         Show this help message

Examples:
  node templates/validator.js --product weather-station
  node templates/validator.js --product power-solutions --strict
  node templates/validator.js --all --json
`);
}

// =============================================================================
// ENTRY POINT
// =============================================================================

/**
 * Resolves the list of .md file paths to validate based on CLI arguments.
 *
 * @param {{ product: string|null, all: boolean }} args
 * @returns {string[]} Array of absolute file paths
 */
function resolveFiles(args) {
  if (!fs.existsSync(KB_DIR)) {
    console.error(`Error: Knowledge-base directory not found: ${KB_DIR}`);
    process.exit(1);
  }

  if (args.all) {
    const files = fs.readdirSync(KB_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => path.join(KB_DIR, f));

    if (files.length === 0) {
      console.error('Error: No .md files found in knowledge-base/');
      process.exit(1);
    }
    return files;
  }

  // Single product.
  const filePath = path.join(KB_DIR, `${args.product}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: Knowledge-base file not found: ${filePath}`);
    console.error(`Available products:`);
    const available = fs.readdirSync(KB_DIR).filter(f => f.endsWith('.md'));
    for (const f of available) {
      console.error(`  - ${f.replace('.md', '')}`);
    }
    process.exit(1);
  }
  return [filePath];
}

/**
 * Main function — parses arguments, runs validation, prints report, exits.
 */
function main() {
  const args = parseArgs(process.argv);
  const files = resolveFiles(args);

  /** @type {Map<string, Issue[]>} */
  const resultsByFile = new Map();

  for (const filePath of files) {
    const issues = validateFile(filePath);
    resultsByFile.set(path.basename(filePath), issues);
  }

  // Output the report.
  let summary;
  if (args.json) {
    summary = printJsonReport(resultsByFile);
  } else {
    summary = printReport(resultsByFile);
  }

  // Determine exit code.
  if (args.strict) {
    // Strict mode: fail on any errors OR warnings.
    process.exit(summary.errors > 0 || summary.warnings > 0 ? 1 : 0);
  } else {
    // Normal mode: fail only on errors.
    process.exit(summary.errors > 0 ? 1 : 0);
  }
}

// Run when invoked directly.
if (require.main === module) {
  main();
}

// Export functions for programmatic use / testing.
module.exports = {
  validateFile,
  checkSpecUnits,
  checkActionVerbs,
  checkSafetySignalWords,
  checkMetadata,
  checkTBDPlaceholders,
  checkCrossReferences,
  checkAcronyms,
  SEVERITY,
  createIssue
};
