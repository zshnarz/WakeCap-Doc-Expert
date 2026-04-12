#!/usr/bin/env node
/**
 * WakeCap Reference Template Generator
 *
 * Creates reference-A.docx and reference-B.docx for Pandoc.
 * These files define all WakeCap styles (headings, body text, tables,
 * headers, footers) that Pandoc maps its output to.
 *
 * Run once, or whenever branding changes:
 *   node pandoc/create-reference.js
 *
 * After generation, you can open the .docx in Word and further tweak
 * styles visually — Pandoc will respect whatever styles are in the file.
 */

const {
  Document, Packer, Paragraph, TextRun, Header, Footer,
  AlignmentType, HeadingLevel, PageNumber, ImageRun,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  ShadingType, VerticalAlign, LevelFormat, PageBreak,
  TabStopPosition, TabStopType
} = require('docx');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Brand constants
// ---------------------------------------------------------------------------

const BRAND = {
  charcoal: '212121',
  slate: '333333',
  lightGray: 'F5F5F5',
  white: 'FFFFFF',
  accent: '333333',
  danger: 'BD2024',
  warning: 'FF7900',
  caution: 'EED202',
  notice: '0077C8',
  fontHeading: 'Source Sans Pro',
  fontBody: 'Source Sans Pro',
  fontMono: 'Roboto Mono'
};

// Version-specific sizes (half-points)
const VERSIONS = {
  A: {
    name: 'Marketing / Sales',
    h1: 56, h2: 40, h3: 28, h4: 24, body: 22, caption: 18, table: 18,
    h1Color: BRAND.accent,
    h2Color: BRAND.accent,
    marginTop: 1134, marginBottom: 1134, marginLeft: 1417, marginRight: 1020
  },
  B: {
    name: 'Technical / Field',
    h1: 48, h2: 36, h3: 24, h4: 22, body: 20, caption: 16, table: 16,
    h1Color: BRAND.charcoal,
    h2Color: BRAND.charcoal,
    marginTop: 1134, marginBottom: 1134, marginLeft: 1247, marginRight: 850
  }
};

// ---------------------------------------------------------------------------
// Logo loading (graceful fallback)
// ---------------------------------------------------------------------------

function loadLogo(name) {
  const candidates = [
    path.resolve(__dirname, '..', 'output', name),
    path.resolve(__dirname, '..', 'images', name)
  ];
  for (const p of candidates) {
    try {
      return fs.readFileSync(p);
    } catch { /* try next */ }
  }
  return null;
}

const logotype = loadLogo('LOGOTYPE.png');

// ---------------------------------------------------------------------------
// Build a reference document for a given version
// ---------------------------------------------------------------------------

function buildReference(version) {
  const v = VERSIONS[version];

  // Header with optional logo
  const headerChildren = [];
  if (logotype) {
    headerChildren.push(
      new Paragraph({
        children: [
          new ImageRun({
            data: logotype,
            transformation: { width: 120, height: 18 },
            type: 'png'
          })
        ],
        alignment: AlignmentType.LEFT
      })
    );
  } else {
    headerChildren.push(
      new Paragraph({
        children: [new TextRun({ text: 'WAKECAP', bold: true, size: 16, font: BRAND.fontHeading, color: BRAND.charcoal })],
        alignment: AlignmentType.LEFT
      })
    );
  }

  // Footer with page number
  const footerChildren = [
    new Paragraph({
      children: [
        new TextRun({ text: 'WakeCap Technologies  |  ', size: 14, font: BRAND.fontBody, color: BRAND.slate }),
        new TextRun({ text: 'Confidential  |  Page ', size: 14, font: BRAND.fontBody, color: BRAND.slate }),
        new TextRun({ children: [PageNumber.CURRENT], size: 14, font: BRAND.fontBody, color: BRAND.slate }),
        new TextRun({ text: ' of ', size: 14, font: BRAND.fontBody, color: BRAND.slate }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 14, font: BRAND.fontBody, color: BRAND.slate })
      ],
      alignment: AlignmentType.CENTER
    })
  ];

  // Sample content demonstrating all styles Pandoc will map to
  const content = [
    // Heading 1
    new Paragraph({
      children: [new TextRun({ text: 'Heading 1', size: v.h1, font: BRAND.fontHeading, color: v.h1Color, bold: true })],
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 360, before: 0 }
    }),
    // Heading 2
    new Paragraph({
      children: [new TextRun({ text: 'Heading 2', size: v.h2, font: BRAND.fontHeading, color: v.h2Color, bold: true })],
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 240, before: 300 }
    }),
    // Heading 3
    new Paragraph({
      children: [new TextRun({ text: 'Heading 3', size: v.h3, font: BRAND.fontHeading, color: BRAND.charcoal, bold: true })],
      heading: HeadingLevel.HEADING_3,
      spacing: { after: 120, before: 200 }
    }),
    // Heading 4
    new Paragraph({
      children: [new TextRun({ text: 'Heading 4', size: v.h4, font: BRAND.fontHeading, color: BRAND.charcoal, bold: true, italics: true })],
      heading: HeadingLevel.HEADING_4,
      spacing: { after: 100, before: 160 }
    }),
    // Body text (Normal)
    new Paragraph({
      children: [new TextRun({
        text: 'Body text paragraph. This defines the Normal style that Pandoc will use for all body content.',
        size: v.body, font: BRAND.fontBody, color: BRAND.charcoal
      })],
      spacing: { after: 120, line: 276 }
    }),
    // Bold body
    new Paragraph({
      children: [new TextRun({
        text: 'Bold body text for emphasis.',
        size: v.body, font: BRAND.fontBody, color: BRAND.charcoal, bold: true
      })],
      spacing: { after: 120, line: 276 }
    }),
    // Block quote
    new Paragraph({
      children: [new TextRun({
        text: 'Block Quote: used for callouts and safety panels.',
        size: v.body, font: BRAND.fontBody, color: BRAND.slate, italics: true
      })],
      indent: { left: 720 },
      spacing: { after: 120 },
      border: {
        left: { style: BorderStyle.SINGLE, size: 12, color: BRAND.accent }
      }
    }),
    // Code block (Verbatim Char / Source Code)
    new Paragraph({
      children: [new TextRun({
        text: 'Code block: monospace text for terminal output and configuration.',
        size: v.caption, font: BRAND.fontMono, color: BRAND.charcoal
      })],
      spacing: { after: 80 },
      shading: { type: ShadingType.CLEAR, fill: BRAND.lightGray }
    }),
    // Caption
    new Paragraph({
      children: [new TextRun({
        text: 'Table 1: Example caption for tables and figures.',
        size: v.caption, font: BRAND.fontBody, color: BRAND.slate, italics: true
      })],
      spacing: { after: 80 }
    }),
    // Simple table to define table style
    new Table({
      rows: [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Parameter', size: v.table, font: BRAND.fontBody, bold: true, color: BRAND.white })],
              })],
              shading: { type: ShadingType.CLEAR, fill: BRAND.charcoal },
              verticalAlign: VerticalAlign.CENTER,
              width: { size: 50, type: WidthType.PERCENTAGE }
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Value', size: v.table, font: BRAND.fontBody, bold: true, color: BRAND.white })],
              })],
              shading: { type: ShadingType.CLEAR, fill: BRAND.charcoal },
              verticalAlign: VerticalAlign.CENTER,
              width: { size: 50, type: WidthType.PERCENTAGE }
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Sample parameter', size: v.table, font: BRAND.fontBody, color: BRAND.charcoal })],
              })],
              verticalAlign: VerticalAlign.CENTER
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Sample value', size: v.table, font: BRAND.fontBody, color: BRAND.charcoal })],
              })],
              verticalAlign: VerticalAlign.CENTER
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Alternating row', size: v.table, font: BRAND.fontBody, color: BRAND.charcoal })],
              })],
              shading: { type: ShadingType.CLEAR, fill: BRAND.lightGray },
              verticalAlign: VerticalAlign.CENTER
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'With shading', size: v.table, font: BRAND.fontBody, color: BRAND.charcoal })],
              })],
              shading: { type: ShadingType.CLEAR, fill: BRAND.lightGray },
              verticalAlign: VerticalAlign.CENTER
            })
          ]
        })
      ],
      width: { size: 100, type: WidthType.PERCENTAGE }
    }),
    // Spacer
    new Paragraph({ children: [], spacing: { after: 200 } })
  ];

  const doc = new Document({
    creator: 'WakeCap Technologies',
    title: `WakeCap Reference Template — Version ${version}`,
    description: `Pandoc reference document for WakeCap ${v.name} style`,
    styles: {
      default: {
        document: {
          run: {
            size: v.body,
            font: BRAND.fontBody,
            color: BRAND.charcoal
          },
          paragraph: {
            spacing: { after: 120, line: 276 }
          }
        },
        heading1: {
          run: {
            size: v.h1,
            font: BRAND.fontHeading,
            color: v.h1Color,
            bold: true
          },
          paragraph: {
            spacing: { after: 360, before: 0 }
          }
        },
        heading2: {
          run: {
            size: v.h2,
            font: BRAND.fontHeading,
            color: v.h2Color,
            bold: true
          },
          paragraph: {
            spacing: { after: 240, before: 300 }
          }
        },
        heading3: {
          run: {
            size: v.h3,
            font: BRAND.fontHeading,
            color: BRAND.charcoal,
            bold: true
          },
          paragraph: {
            spacing: { after: 120, before: 200 }
          }
        },
        heading4: {
          run: {
            size: v.h4,
            font: BRAND.fontHeading,
            color: BRAND.charcoal,
            bold: true,
            italics: true
          },
          paragraph: {
            spacing: { after: 100, before: 160 }
          }
        },
        listParagraph: {
          run: {
            size: v.body,
            font: BRAND.fontBody,
            color: BRAND.charcoal
          }
        }
      }
    },
    numbering: {
      config: [
        {
          reference: 'wakecap-numbering',
          levels: [
            { level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT },
            { level: 1, format: LevelFormat.LOWER_LETTER, text: '%2)', alignment: AlignmentType.LEFT },
            { level: 2, format: LevelFormat.LOWER_ROMAN, text: '%3.', alignment: AlignmentType.LEFT }
          ]
        }
      ]
    },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838, orientation: 'portrait' },
          margin: {
            top: v.marginTop,
            bottom: v.marginBottom,
            left: v.marginLeft,
            right: v.marginRight
          }
        }
      },
      headers: {
        default: new Header({ children: headerChildren })
      },
      footers: {
        default: new Footer({ children: footerChildren })
      },
      children: content
    }]
  });

  return doc;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const outDir = path.resolve(__dirname);

  for (const version of ['A', 'B']) {
    const doc = buildReference(version);
    const buffer = await Packer.toBuffer(doc);
    const outPath = path.join(outDir, `reference-${version}.docx`);
    fs.writeFileSync(outPath, buffer);
    console.log(`Created: ${outPath} (${VERSIONS[version].name})`);
  }

  console.log('\nReference templates ready. Pandoc will use these for all document generation.');
  console.log('To customize further, open in Word, modify styles, and save.');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
