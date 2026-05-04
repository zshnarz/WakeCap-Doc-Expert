/**
 * WakeCap Markdown-to-DOCX Parser
 *
 * Converts markdown content into docx paragraph/table elements using the
 * shared WakeCap component library. Extracted and enhanced from the gateway
 * batch generator.
 *
 * Enhancements over the original:
 *   - Inline formatting: **bold**, *italic*, `code` → multiple TextRun objects
 *   - Nested list support via indent tracking
 *   - Multi-paragraph blockquote accumulation
 *   - H4 heading support
 *   - Page break markers (--- or \pagebreak)
 *   - ![alt](path) image syntax support (placeholder fallback)
 */

const {
  COLORS, FONT_SIZES, SPACING,
  createHeading, createBodyText,
  createBullet, createNumberedStep, createSpacer,
  createSpecTable, createCalloutBox, createSafetyPanel,
  createImagePlaceholder, createImage,
  Paragraph, TextRun, PageBreak
} = require('./docx-generator');

// ---------------------------------------------------------------------------
// Inline formatting parser
// ---------------------------------------------------------------------------

/**
 * Parse inline markdown formatting into an array of TextRun objects.
 * Supports: **bold**, *italic*, `code`, and plain text.
 */
function parseInlineFormatting(text, baseSize, baseFont, baseColor) {
  const runs = [];
  // Regex to match **bold**, *italic*, `code` segments
  const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;

  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    // Add plain text before this match
    if (match.index > lastIndex) {
      const plain = text.substring(lastIndex, match.index);
      if (plain) {
        runs.push(new TextRun({
          text: plain,
          size: baseSize,
          font: baseFont,
          color: baseColor
        }));
      }
    }

    if (match[2]) {
      // **bold**
      runs.push(new TextRun({
        text: match[2],
        bold: true,
        size: baseSize,
        font: baseFont,
        color: baseColor
      }));
    } else if (match[3]) {
      // *italic*
      runs.push(new TextRun({
        text: match[3],
        italics: true,
        size: baseSize,
        font: baseFont,
        color: baseColor
      }));
    } else if (match[4]) {
      // `code`
      runs.push(new TextRun({
        text: match[4],
        size: baseSize,
        font: 'Roboto Mono',
        color: COLORS.charcoal
      }));
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining plain text
  if (lastIndex < text.length) {
    const remaining = text.substring(lastIndex);
    if (remaining) {
      runs.push(new TextRun({
        text: remaining,
        size: baseSize,
        font: baseFont,
        color: baseColor
      }));
    }
  }

  // If no formatting was found, return a single plain run
  if (runs.length === 0) {
    runs.push(new TextRun({
      text: text,
      size: baseSize,
      font: baseFont,
      color: baseColor
    }));
  }

  return runs;
}

// ---------------------------------------------------------------------------
// Main parser
// ---------------------------------------------------------------------------

/**
 * Parse markdown content into an array of docx elements.
 *
 * @param {string} mdContent - Raw markdown string
 * @param {string} [version='B'] - Style version ('A' or 'B')
 * @returns {Array} Array of Paragraph/Table objects
 */
function parseMarkdownToDocx(mdContent, version = 'B') {
  const lines = mdContent.split('\n');
  const elements = [];
  let i = 0;
  let inTable = false;
  let tableHeaders = [];
  let tableRows = [];

  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  const spacing = version === 'A' ? SPACING.versionA : SPACING.versionB;

  function flushTable() {
    if (tableHeaders.length > 0) {
      elements.push(createSpecTable(tableHeaders, tableRows, version));
      elements.push(createSpacer(spacing.bodyAfter));
      tableHeaders = [];
      tableRows = [];
    }
    inTable = false;
  }

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (trimmed === '') {
      if (inTable) flushTable();
      i++;
      continue;
    }

    // Page break markers
    if (trimmed === '\\pagebreak' || trimmed === '\\newpage') {
      if (inTable) flushTable();
      elements.push(new Paragraph({ children: [new PageBreak()] }));
      i++;
      continue;
    }

    // Horizontal rules (--- or ===) as page breaks or spacers
    if (/^[-=]{3,}$/.test(trimmed)) {
      if (inTable) flushTable();
      // Treat --- as a visual separator (spacer), not a page break
      elements.push(createSpacer(200));
      i++;
      continue;
    }

    // Code blocks
    if (trimmed.startsWith('```')) {
      if (inTable) flushTable();
      i++;
      const codeLines = [];
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // skip closing ```
      for (const cl of codeLines) {
        elements.push(new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: cl,
              size: sizes.table,
              font: 'Roboto Mono',
              color: COLORS.charcoal
            })
          ]
        }));
      }
      elements.push(createSpacer(spacing.bodyAfter));
      continue;
    }

    // Table rows
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.split('|').filter(c => c.trim() !== '').map(c => c.trim());

      // Check if separator row
      if (cells.every(c => /^[-:]+$/.test(c))) {
        i++;
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      i++;
      continue;
    }

    // If we were in a table but hit non-table content
    if (inTable) flushTable();

    // Headings (H1-H4)
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      if (level <= 3) {
        elements.push(createHeading(text, level, version));
      } else {
        // H4 - custom since createHeading only handles 1-3
        elements.push(new Paragraph({
          spacing: {
            before: version === 'A' ? 180 : 160,
            after: version === 'A' ? 80 : 60
          },
          children: [
            new TextRun({
              text: text,
              bold: true,
              size: sizes.h4,
              font: 'Source Sans Pro',
              color: COLORS.slate
            })
          ]
        }));
      }
      i++;
      continue;
    }

    // Safety panels (blockquotes starting with signal words)
    if (trimmed.startsWith('> **WARNING**') || trimmed.startsWith('> **DANGER**') ||
        trimmed.startsWith('> **CAUTION**') || trimmed.startsWith('> **NOTICE**')) {
      const level = trimmed.includes('DANGER') ? 'danger' :
                    trimmed.includes('WARNING') ? 'warning' :
                    trimmed.includes('CAUTION') ? 'caution' : 'notice';
      i++;
      const msgLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        const msgLine = lines[i].trim().replace(/^>\s*/, '').replace(/\*\*/g, '');
        if (msgLine) msgLines.push(msgLine);
        i++;
      }
      elements.push(createSafetyPanel(level, msgLines.join(' '), version));
      elements.push(createSpacer(spacing.bodyAfter));
      continue;
    }

    // Multi-paragraph blockquotes (non-safety)
    if (trimmed.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        const quoteLine = lines[i].trim().replace(/^>\s*/, '').replace(/\*\*/g, '');
        if (quoteLine) quoteLines.push(quoteLine);
        i++;
      }
      elements.push(createCalloutBox('note', quoteLines.join(' '), version));
      elements.push(createSpacer(spacing.bodyAfter));
      continue;
    }

    // Image markdown syntax: ![alt](path)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      const altText = imgMatch[1] || imgMatch[2];
      const imgPath = imgMatch[2];
      // Try to embed actual image; falls back to placeholder if file not found
      elements.push(createImage(imgPath, { altText, version }));
      elements.push(createSpacer(spacing.bodyAfter));
      i++;
      continue;
    }

    // IMAGE placeholders: [IMAGE: description]
    if (trimmed.startsWith('[IMAGE:')) {
      const desc = trimmed.replace(/^\[IMAGE:\s*/, '').replace(/\]$/, '');
      elements.push(createImagePlaceholder(desc, version));
      elements.push(createSpacer(spacing.bodyAfter));
      i++;
      continue;
    }

    // Nested bullet lists (detect indent level)
    if (/^(\s*)[-*]\s+/.test(line)) {
      const indentMatch = line.match(/^(\s*)/);
      const indent = indentMatch ? indentMatch[1].length : 0;
      const level = Math.min(Math.floor(indent / 2), 3); // max 4 levels
      const bulletText = trimmed.replace(/^[-*]\s+/, '');
      const runs = parseInlineFormatting(bulletText, sizes.body, 'Source Sans Pro', COLORS.charcoal);

      elements.push(new Paragraph({
        spacing: { after: 60 },
        indent: { left: 360 + (level * 360) },
        children: [
          new TextRun({ text: '\u2022 ', size: sizes.body, font: 'Source Sans Pro', color: COLORS.wakecapBlue }),
          ...runs
        ]
      }));
      i++;
      continue;
    }

    // Numbered list items
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
    if (numberedMatch) {
      const num = numberedMatch[1];
      const text = numberedMatch[2];
      const runs = parseInlineFormatting(text, sizes.body, 'Source Sans Pro', COLORS.charcoal);

      elements.push(new Paragraph({
        spacing: { after: 60 },
        indent: { left: 360 },
        children: [
          new TextRun({ text: `${num}. `, bold: true, size: sizes.body, font: 'Source Sans Pro', color: COLORS.wakecapBlue }),
          ...runs
        ]
      }));
      i++;
      continue;
    }

    // Checkbox items
    if (trimmed.startsWith('- [') || trimmed.startsWith('☐')) {
      const cbText = trimmed.replace(/^-\s*\[.\]\s*/, '').replace(/^☐\s*/, '');
      elements.push(new Paragraph({
        spacing: { after: 60 },
        indent: { left: 360 },
        children: [
          new TextRun({ text: '☐ ', size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal }),
          new TextRun({ text: cbText, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal })
        ]
      }));
      i++;
      continue;
    }

    // Bold paragraph headers (like **Key Benefits:** )
    if (trimmed.startsWith('**') && trimmed.includes(':**')) {
      const boldText = trimmed.replace(/\*\*/g, '');
      elements.push(new Paragraph({
        spacing: { before: 100, after: 60 },
        children: [
          new TextRun({ text: boldText, bold: true, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal })
        ]
      }));
      i++;
      continue;
    }

    // Regular body text - with inline formatting
    if (trimmed.length > 0) {
      const runs = parseInlineFormatting(trimmed, sizes.body, 'Source Sans Pro', COLORS.charcoal);
      elements.push(new Paragraph({
        spacing: { after: spacing.bodyAfter },
        children: runs
      }));
    }
    i++;
  }

  if (inTable) flushTable();

  return elements;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

module.exports = {
  parseMarkdownToDocx,
  parseInlineFormatting
};
