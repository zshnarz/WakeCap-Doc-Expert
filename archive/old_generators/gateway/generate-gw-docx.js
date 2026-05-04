/**
 * WakeCap Gateway - Batch DOCX Generator
 * Generates .docx files for all 17 Gateway document types
 * Version B (Technical/Field) style
 */

const {
  PAGE_A4,
  createHeader, createFooter,
  getDocumentStyles,
  Document, Packer
} = require('../../templates/docx-generator.js');
const { parseMarkdownToDocx } = require('../../templates/markdown-parser.js');
const fs = require('fs');
const path = require('path');

const VERSION = 'B';
const DATE = '2026-02-09';

// =============================================================================
// DOCUMENT BUILDER
// =============================================================================

function buildDocument(docId, productName, docType, contentElements) {
  const doc = new Document({
    styles: getDocumentStyles(VERSION),
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_A4.width, height: PAGE_A4.height },
          margin: {
            top: 1020,
            bottom: 1020,
            left: 1247,
            right: 850
          }
        }
      },
      headers: {
        default: createHeader(productName, docType)
      },
      footers: {
        default: createFooter(docId, DATE)
      },
      children: contentElements
    }]
  });
  return doc;
}

// =============================================================================
// DOCUMENT DEFINITIONS
// =============================================================================

const documents = [
  { code: 'DS', type: 'Product Datasheet', fullType: 'Datasheet' },
  { code: 'PO', type: 'Product Overview', fullType: 'Product Overview' },
  { code: 'QR', type: 'Quick Reference', fullType: 'Quick Reference' },
  { code: 'IG', type: 'Installation Guide', fullType: 'Installation Guide' },
  { code: 'CG', type: 'Commissioning Guide', fullType: 'Commissioning Guide' },
  { code: 'TG', type: 'Troubleshooting Guide', fullType: 'Troubleshooting Guide' },
  { code: 'MG', type: 'Maintenance Manual', fullType: 'Maintenance Manual' },
  { code: 'PM', type: 'Product Manual', fullType: 'Product Manual' },
  { code: 'TR', type: 'Technical Reference', fullType: 'Technical Reference' },
  { code: 'SB', type: 'Solution Brief', fullType: 'Solution Brief' },
  { code: 'CS', type: 'Compliance Summary', fullType: 'Compliance Summary' },
  { code: 'ICD', type: 'Interface Control Document', fullType: 'Interface Control Document' },
  { code: 'SIG', type: 'System Integration Guide', fullType: 'System Integration Guide' },
  { code: 'SM', type: 'Safety Manual', fullType: 'Safety Manual' },
  { code: 'RN', type: 'Release Notes', fullType: 'Release Notes' },
  { code: 'OG', type: 'Operations Guide', fullType: 'Operations Guide' },
  { code: 'RB', type: 'Runbook', fullType: 'Runbook' }
];

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  const outputDir = path.resolve(__dirname, '../../output/gateway');
  let successCount = 0;
  let failCount = 0;

  for (const docDef of documents) {
    const mdFile = `${outputDir}/WC-GW-${docDef.code}-v1.0.md`;
    const docxFile = `${outputDir}/WC-GW-${docDef.code}-v1.0.docx`;
    const docId = `WC-GW-${docDef.code}-v1.0`;

    try {
      // Check if markdown source exists
      if (!fs.existsSync(mdFile)) {
        console.log(`SKIP: ${mdFile} not found`);
        failCount++;
        continue;
      }

      // Read markdown content
      const mdContent = fs.readFileSync(mdFile, 'utf8');

      // Parse markdown to docx elements
      const contentElements = parseMarkdownToDocx(mdContent, VERSION);

      // Build document
      const doc = buildDocument(docId, 'Gateway', docDef.fullType, contentElements);

      // Generate .docx
      const buffer = await Packer.toBuffer(doc);
      fs.writeFileSync(docxFile, buffer);

      console.log(`OK: ${docxFile}`);
      successCount++;
    } catch (err) {
      console.error(`FAIL: ${docDef.code} - ${err.message}`);
      failCount++;
    }
  }

  console.log(`\nComplete: ${successCount} succeeded, ${failCount} failed out of ${documents.length} documents.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
