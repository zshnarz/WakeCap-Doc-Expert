/**
 * WakeCap Gateway — LED Quick Reference DOCX Generator
 * Builds WC-GW-QR-LED-v1.0.docx from the matching markdown.
 */

const path = require('path');
const fs = require('fs');

const {
  PAGE_A4,
  createHeader,
  createFooter,
  getDocumentStyles,
} = require('../docx-generator.js');
const { parseMarkdownToDocx } = require('../markdown-parser.js');
const { Document, Packer } = require('docx');

const VERSION = 'B';
const DOC_ID = 'WC-GW-QR-LED-v1.0';
const DATE = '2026-05-04';
const PRODUCT_NAME = 'WakeCap Gateway';
const DOC_TYPE = 'Quick Reference — LED Patterns';

const mdPath = path.resolve(
  __dirname,
  '../../output/gateway/WC-GW-QR-LED-v1.0.md'
);
const outPath = path.resolve(
  __dirname,
  '../../output/gateway/WC-GW-QR-LED-v1.0.docx'
);

const md = fs.readFileSync(mdPath, 'utf8');
const contentElements = parseMarkdownToDocx(md, VERSION);

const doc = new Document({
  styles: getDocumentStyles(VERSION),
  sections: [
    {
      properties: {
        page: {
          size: { width: PAGE_A4.width, height: PAGE_A4.height },
          margin: {
            top: 1020,
            bottom: 1020,
            left: 1247,
            right: 850,
          },
        },
      },
      headers: { default: createHeader(PRODUCT_NAME, DOC_TYPE) },
      footers: { default: createFooter(DOC_ID, DATE) },
      children: contentElements,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log('Wrote:', outPath, '(', buf.length, 'bytes )');
});
