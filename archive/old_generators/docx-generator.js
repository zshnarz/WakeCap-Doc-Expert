/**
 * WakeCap Documentation Generator - Base Template
 * 
 * This file provides the foundation for generating .docx files
 * following the WakeCap Documentation Style Guide.
 * 
 * Usage: Copy and modify this template for specific document types
 */

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  Header,
  Footer,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  VerticalAlign,
  PageNumber,
  PageBreak,
  LevelFormat,
  TableOfContents,
  ImageRun
} = require('docx');
const fs = require('fs');
const path = require('path');

// Logo assets (LOGOTYPE = full WAKECAP wordmark for headers; LOGOMARK = W icon for covers)
const logotypeBuffer = fs.readFileSync(path.resolve(__dirname, '../output/LOGOTYPE.png'));
const logomarkBuffer = fs.readFileSync(path.resolve(__dirname, '../output/LOGOMARK.png'));

// =============================================================================
// STYLE CONFIGURATION - WakeCap Documentation Style Guide
// =============================================================================

const COLORS = {
  // Primary Brand (charcoal grey theme)
  wakecapBlue: '333333',
  deepBlue: '333333',
  alertOrange: 'FB923C',

  // Text
  charcoal: '212121',
  slate: '333333',
  gray: '333333',

  // Backgrounds
  white: 'FFFFFF',
  lightGray: 'F5F5F5',
  borderGray: '333333',

  // Safety (ANSI)
  danger: 'BD2024',
  warning: 'FF7900',
  caution: 'EED202',
  notice: '333333',

  // Callouts
  noteBackground: 'F5F5F5',
  noteBorder: '333333',
  tipBackground: 'F0FDF4',
  tipBorder: '22C55E',
  importantBackground: 'FDF4FF',
  importantBorder: 'A855F7',

  // Placeholder highlight
  placeholder: 'FEF3C7'
};

// Font sizes in half-points (multiply pt by 2)
const FONT_SIZES = {
  versionA: {
    h1: 56,  // 28pt
    h2: 40,  // 20pt
    h3: 28,  // 14pt
    h4: 24,  // 12pt
    body: 22, // 11pt
    caption: 18, // 9pt
    table: 18 // 9pt
  },
  versionB: {
    h1: 48,  // 24pt
    h2: 36,  // 18pt
    h3: 24,  // 12pt
    h4: 22,  // 11pt
    body: 20, // 10pt
    caption: 16, // 8pt
    table: 16 // 8pt
  }
};

// Spacing in twips (1/20 of a point, 1440 twips = 1 inch)
const SPACING = {
  versionA: {
    h1After: 480,
    h2Before: 360,
    h2After: 240,
    h3Before: 240,
    h3After: 120,
    bodyAfter: 160
  },
  versionB: {
    h1After: 360,
    h2Before: 300,
    h2After: 180,
    h3Before: 200,
    h3After: 100,
    bodyAfter: 120
  }
};

// Page setup for A4
const PAGE_A4 = {
  width: 11906,  // 210mm in DXA
  height: 16838, // 297mm in DXA
  margins: {
    top: 1134,    // 20mm
    bottom: 1134, // 20mm
    left: 1417,   // 25mm (binding)
    right: 1020   // 18mm
  }
};

// Document type codes → full names
const DOCUMENT_TYPES = {
  DS:  { code: 'DS',  name: 'Product Datasheet',          category: 'sales' },
  PO:  { code: 'PO',  name: 'Product Overview',           category: 'sales' },
  SB:  { code: 'SB',  name: 'Solution Brief',             category: 'sales' },
  CS:  { code: 'CS',  name: 'Compliance Summary',         category: 'sales' },
  QR:  { code: 'QR',  name: 'Quick Reference',            category: 'field' },
  IG:  { code: 'IG',  name: 'Installation Guide',         category: 'field' },
  SG:  { code: 'SG',  name: 'Setup Guide',                category: 'field' },
  CG:  { code: 'CG',  name: 'Commissioning Guide',        category: 'field' },
  TG:  { code: 'TG',  name: 'Troubleshooting Guide',      category: 'field' },
  MG:  { code: 'MG',  name: 'Maintenance Manual',         category: 'field' },
  PM:  { code: 'PM',  name: 'Product Manual',             category: 'engineering' },
  TR:  { code: 'TR',  name: 'Technical Reference',        category: 'engineering' },
  ICD: { code: 'ICD', name: 'Interface Control Document', category: 'engineering' },
  SIG: { code: 'SIG', name: 'System Integration Guide',   category: 'engineering' },
  SM:  { code: 'SM',  name: 'Safety Manual',               category: 'engineering' },
  RN:  { code: 'RN',  name: 'Release Notes',              category: 'engineering' },
  OG:  { code: 'OG',  name: 'Operations Guide',           category: 'operations' },
  RB:  { code: 'RB',  name: 'Runbook',                    category: 'operations' },
  PC:  { code: 'PC',  name: 'Product Catalogue',          category: 'sales' },
  UG:  { code: 'UG',  name: 'User Guide & FAQ',           category: 'field' }
};

// Product codes for document ID generation
const PRODUCT_CODES = {
  'weather-station': 'WS',
  'gateway': 'GW',
  'power-solutions': 'PS',
  'smart-hat': 'SH',
  'anchor': 'AN',
  'modbus-asset': 'MA',
  'id-card': 'ID'
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Creates a styled heading paragraph
 */
function createHeading(text, level, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  const spacing = version === 'A' ? SPACING.versionA : SPACING.versionB;
  
  const config = {
    1: { 
      size: sizes.h1, 
      color: version === 'A' ? COLORS.wakecapBlue : COLORS.charcoal,
      spacingBefore: 0,
      spacingAfter: spacing.h1After,
      heading: HeadingLevel.HEADING_1
    },
    2: {
      size: sizes.h2,
      color: version === 'A' ? COLORS.wakecapBlue : COLORS.charcoal,
      spacingBefore: spacing.h2Before,
      spacingAfter: spacing.h2After,
      heading: HeadingLevel.HEADING_2
    },
    3: {
      size: sizes.h3,
      color: COLORS.charcoal,
      spacingBefore: spacing.h3Before,
      spacingAfter: spacing.h3After,
      heading: HeadingLevel.HEADING_3
    }
  };
  
  const style = config[level] || config[3];
  
  return new Paragraph({
    heading: style.heading,
    spacing: { before: style.spacingBefore, after: style.spacingAfter },
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: style.size,
        font: 'Source Sans Pro',
        color: style.color
      })
    ]
  });
}

/**
 * Creates a body text paragraph
 */
function createBodyText(text, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  const spacing = version === 'A' ? SPACING.versionA : SPACING.versionB;
  
  return new Paragraph({
    spacing: { after: spacing.bodyAfter },
    children: [
      new TextRun({
        text: text,
        size: sizes.body,
        font: 'Source Sans Pro',
        color: COLORS.charcoal
      })
    ]
  });
}

/**
 * Creates a placeholder text (highlighted for visibility)
 */
function createPlaceholder(text, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  
  return new TextRun({
    text: `[${text}]`,
    size: sizes.body,
    font: 'Source Sans Pro',
    color: COLORS.charcoal,
    highlight: 'yellow'
  });
}

/**
 * Creates a specification table with WakeCap styling
 */
function createSpecTable(headers, rows, version = 'A', accentColor) {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  const contentWidth = PAGE_A4.width - PAGE_A4.margins.left - PAGE_A4.margins.right;
  const colWidth = Math.floor(contentWidth / headers.length);
  const headerFill = accentColor || COLORS.wakecapBlue;

  const border = { style: BorderStyle.SINGLE, size: 1, color: COLORS.borderGray };
  const borders = { top: border, bottom: border, left: border, right: border };

  // Header row
  const headerRow = new TableRow({
    children: headers.map(header =>
      new TableCell({
        borders,
        width: { size: colWidth, type: WidthType.DXA },
        shading: { fill: headerFill, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: header,
                bold: true,
                size: sizes.table,
                font: 'Source Sans Pro',
                color: COLORS.white
              })
            ]
          })
        ]
      })
    )
  });
  
  // Data rows
  const dataRows = rows.map((row, index) => 
    new TableRow({
      children: row.map(cell => 
        new TableCell({
          borders,
          width: { size: colWidth, type: WidthType.DXA },
          shading: { 
            fill: index % 2 === 0 ? COLORS.white : COLORS.lightGray, 
            type: ShadingType.CLEAR 
          },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: cell,
                  size: sizes.table,
                  font: 'Source Sans Pro',
                  color: COLORS.charcoal
                })
              ]
            })
          ]
        })
      )
    })
  );
  
  return new Table({
    width: { size: contentWidth, type: WidthType.DXA },
    columnWidths: Array(headers.length).fill(colWidth),
    rows: [headerRow, ...dataRows]
  });
}

/**
 * Creates a callout box (Note, Tip, Important)
 */
function createCalloutBox(type, text, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  const contentWidth = PAGE_A4.width - PAGE_A4.margins.left - PAGE_A4.margins.right;
  
  const typeConfig = {
    note: { 
      label: 'NOTE', 
      icon: 'ℹ', 
      background: COLORS.noteBackground, 
      border: COLORS.noteBorder 
    },
    tip: { 
      label: 'TIP', 
      icon: '💡', 
      background: COLORS.tipBackground, 
      border: COLORS.tipBorder 
    },
    important: { 
      label: 'IMPORTANT', 
      icon: '⚡', 
      background: COLORS.importantBackground, 
      border: COLORS.importantBorder 
    }
  };
  
  const config = typeConfig[type] || typeConfig.note;
  
  return new Table({
    width: { size: contentWidth, type: WidthType.DXA },
    columnWidths: [contentWidth],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.borderGray },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.borderGray },
              left: { style: BorderStyle.SINGLE, size: 24, color: config.border },
              right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.borderGray }
            },
            width: { size: contentWidth, type: WidthType.DXA },
            shading: { fill: config.background, type: ShadingType.CLEAR },
            margins: { top: 160, bottom: 160, left: 200, right: 160 },
            children: [
              new Paragraph({
                spacing: { after: 80 },
                children: [
                  new TextRun({
                    text: `${config.icon} ${config.label}`,
                    bold: true,
                    size: sizes.body,
                    font: 'Source Sans Pro',
                    color: config.border
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: text,
                    size: sizes.body,
                    font: 'Source Sans Pro',
                    color: COLORS.charcoal
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

/**
 * Creates a safety warning panel (DANGER, WARNING, CAUTION, NOTICE)
 */
function createSafetyPanel(level, message, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  const contentWidth = PAGE_A4.width - PAGE_A4.margins.left - PAGE_A4.margins.right;
  
  const levelConfig = {
    danger: { label: 'DANGER', background: COLORS.danger, textColor: COLORS.white },
    warning: { label: 'WARNING', background: COLORS.warning, textColor: COLORS.charcoal },
    caution: { label: 'CAUTION', background: COLORS.caution, textColor: COLORS.charcoal },
    notice: { label: 'NOTICE', background: COLORS.notice, textColor: COLORS.white }
  };
  
  const config = levelConfig[level] || levelConfig.notice;
  const border = { style: BorderStyle.SINGLE, size: 1, color: config.background };
  
  return new Table({
    width: { size: contentWidth, type: WidthType.DXA },
    columnWidths: [contentWidth],
    rows: [
      // Header row with signal word
      new TableRow({
        children: [
          new TableCell({
            borders: { top: border, left: border, right: border, bottom: { style: BorderStyle.NIL } },
            width: { size: contentWidth, type: WidthType.DXA },
            shading: { fill: config.background, type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 160, right: 160 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `⚠ ${config.label}`,
                    bold: true,
                    size: sizes.body + 4,
                    font: 'Source Sans Pro',
                    color: config.textColor
                  })
                ]
              })
            ]
          })
        ]
      }),
      // Message row
      new TableRow({
        children: [
          new TableCell({
            borders: { bottom: border, left: border, right: border, top: { style: BorderStyle.NIL } },
            width: { size: contentWidth, type: WidthType.DXA },
            shading: { fill: COLORS.white, type: ShadingType.CLEAR },
            margins: { top: 160, bottom: 160, left: 160, right: 160 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: message,
                    size: sizes.body,
                    font: 'Source Sans Pro',
                    color: COLORS.charcoal
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

/**
 * Creates header for document pages
 */
function createHeader(productName, docType) {
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 6, color: COLORS.borderGray }
        },
        spacing: { after: 200 },
        children: [
          new ImageRun({
            data: logotypeBuffer,
            transformation: { width: 150, height: 23 },
            type: 'png'
          })
        ]
      })
    ]
  });
}

/**
 * Creates footer for document pages
 */
function createFooter(docId, revisionDate) {
  return new Footer({
    children: [
      new Paragraph({
        border: {
          top: { style: BorderStyle.SINGLE, size: 6, color: COLORS.borderGray }
        },
        spacing: { before: 200 },
        children: [
          new TextRun({
            text: docId,
            size: 16,
            font: 'Source Sans Pro',
            color: COLORS.slate
          }),
          new TextRun({
            text: '\t\t',
          }),
          new TextRun({
            text: revisionDate,
            size: 16,
            font: 'Source Sans Pro',
            color: COLORS.slate
          }),
          new TextRun({
            text: '\t\t',
          }),
          new TextRun({
            text: 'Page ',
            size: 16,
            font: 'Source Sans Pro',
            color: COLORS.slate
          }),
          new TextRun({
            children: [PageNumber.CURRENT],
            size: 16,
            font: 'Source Sans Pro',
            color: COLORS.slate
          }),
          new TextRun({
            text: ' of ',
            size: 16,
            font: 'Source Sans Pro',
            color: COLORS.slate
          }),
          new TextRun({
            children: [PageNumber.TOTAL_PAGES],
            size: 16,
            font: 'Source Sans Pro',
            color: COLORS.slate
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80 },
        children: [
          new TextRun({
            text: 'For any query, contact Zishan Shahzad, zishan.shahzad@wakecap.com',
            size: 14,
            font: 'Source Sans Pro',
            color: COLORS.slate
          })
        ]
      })
    ]
  });
}

/**
 * Creates an image placeholder box
 */
function createImagePlaceholder(description, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  const contentWidth = PAGE_A4.width - PAGE_A4.margins.left - PAGE_A4.margins.right;
  
  const dashedBorder = { style: BorderStyle.DASHED, size: 12, color: COLORS.gray };
  
  return new Table({
    width: { size: contentWidth, type: WidthType.DXA },
    columnWidths: [contentWidth],
    rows: [
      new TableRow({
        height: { value: 1500, rule: 'atLeast' },
        children: [
          new TableCell({
            borders: {
              top: dashedBorder,
              bottom: dashedBorder,
              left: dashedBorder,
              right: dashedBorder
            },
            width: { size: contentWidth, type: WidthType.DXA },
            shading: { fill: COLORS.lightGray, type: ShadingType.CLEAR },
            verticalAlign: VerticalAlign.CENTER,
            margins: { top: 160, bottom: 160, left: 160, right: 160 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `[IMAGE: ${description}]`,
                    italics: true,
                    size: sizes.body,
                    font: 'Source Sans Pro',
                    color: COLORS.slate
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

/**
 * Creates an embedded image or falls back to placeholder if file not found.
 *
 * @param {string} imagePath - Absolute or relative path to the image file
 * @param {object} [options]
 * @param {number} [options.width=500]  - Display width in px (EMU calculated internally)
 * @param {number} [options.height=300] - Display height in px (EMU calculated internally)
 * @param {string} [options.altText]    - Alt text / caption
 * @param {string} [options.version='B']
 * @returns {Paragraph|Table} Paragraph with ImageRun or placeholder Table
 */
function createImage(imagePath, options = {}) {
  const {
    width = 500,
    height = 300,
    altText = '',
    version = 'B'
  } = options;

  // Resolve path relative to project root if not absolute
  const rootDir = path.resolve(__dirname, '..');
  const resolved = path.isAbsolute(imagePath)
    ? imagePath
    : path.resolve(rootDir, imagePath);

  // Check if the file exists
  if (!fs.existsSync(resolved)) {
    // Fallback to placeholder
    return createImagePlaceholder(altText || imagePath, version);
  }

  try {
    const imageBuffer = fs.readFileSync(resolved);

    // Convert px to EMU (1 px ≈ 9525 EMU at 96 DPI)
    const emuWidth = Math.round(width * 9525);
    const emuHeight = Math.round(height * 9525);

    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 120 },
      children: [
        new ImageRun({
          data: imageBuffer,
          transformation: {
            width: emuWidth,
            height: emuHeight
          },
          altText: { title: altText || path.basename(resolved), description: altText || '' }
        })
      ]
    });
  } catch (err) {
    // On any read/parse error, fall back to placeholder
    return createImagePlaceholder(`${altText || imagePath} [load error: ${err.message}]`, version);
  }
}

/**
 * Creates a bullet point paragraph
 */
function createBullet(text, level = 0, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  return new Paragraph({
    bullet: { level },
    spacing: { after: 80 },
    children: [
      new TextRun({
        text: text,
        size: sizes.body,
        font: 'Source Sans Pro',
        color: COLORS.charcoal
      })
    ]
  });
}

/**
 * Creates a numbered step paragraph
 */
function createNumberedStep(number, text, version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({
        text: `${number}. `,
        bold: true,
        size: sizes.body,
        font: 'Source Sans Pro',
        color: COLORS.wakecapBlue
      }),
      new TextRun({
        text: text,
        size: sizes.body,
        font: 'Source Sans Pro',
        color: COLORS.charcoal
      })
    ]
  });
}

/**
 * Creates a spacer paragraph
 */
function createSpacer(height = 200) {
  return new Paragraph({ spacing: { before: height } });
}

/**
 * Creates a cover page for Version A (marketing) or Version B (technical)
 */
function createCoverPage(options = {}) {
  const {
    productName = '[Product Name]',
    docType = '[Document Type]',
    docId = 'WC-XX-XX-v1.0',
    revisionDate = new Date().toISOString().split('T')[0],
    subtitle = '',
    version = 'A'
  } = options;

  const elements = [];

  // Top spacer
  elements.push(new Paragraph({ spacing: { before: 2400 } }));

  // Brand W lettermark
  elements.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [new ImageRun({
      data: logomarkBuffer,
      transformation: { width: 130, height: 104 },
      type: 'png'
    })]
  }));

  // Product name
  elements.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
    children: [new TextRun({
      text: productName.toUpperCase(),
      bold: true,
      size: version === 'A' ? 60 : 48,
      font: 'Source Sans Pro',
      color: COLORS.charcoal
    })]
  }));

  // Decorative line
  const contentWidth = PAGE_A4.width - PAGE_A4.margins.left - PAGE_A4.margins.right;
  const lineWidth = Math.floor(contentWidth * 0.4);
  elements.push(new Table({
    width: { size: lineWidth, type: WidthType.DXA },
    rows: [new TableRow({
      height: { value: 60, rule: 'exact' },
      children: [new TableCell({
        borders: {
          top: { style: BorderStyle.NIL },
          bottom: { style: BorderStyle.NIL },
          left: { style: BorderStyle.NIL },
          right: { style: BorderStyle.NIL }
        },
        shading: { fill: COLORS.wakecapBlue, type: ShadingType.CLEAR },
        width: { size: lineWidth, type: WidthType.DXA },
        children: [new Paragraph({ children: [] })]
      })]
    })],
    alignment: AlignmentType.CENTER
  }));

  // Document type
  elements.push(new Paragraph({ spacing: { before: 300 } }));
  elements.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 150 },
    children: [new TextRun({
      text: docType,
      size: 40,
      font: 'Source Sans Pro',
      color: COLORS.slate
    })]
  }));

  // Subtitle if provided
  if (subtitle) {
    elements.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [new TextRun({
        text: subtitle,
        size: 24,
        font: 'Source Sans Pro',
        color: COLORS.slate,
        italics: true
      })]
    }));
  }

  // Bottom spacer + metadata
  elements.push(new Paragraph({ spacing: { before: 1800 } }));
  elements.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({
      text: `${docId}  |  ${revisionDate}`,
      size: 18,
      font: 'Source Sans Pro',
      color: COLORS.gray
    })]
  }));

  return elements;
}

/**
 * Builds a complete Document object with standard WakeCap structure
 */
function buildDocument(options = {}) {
  const {
    docId = 'WC-XX-XX-v1.0',
    productName = 'Product',
    docType = 'Document',
    version = 'B',
    revisionDate = new Date().toISOString().split('T')[0],
    subtitle = '',
    content = [],
    includeCoverPage = true,
    includeTOC = false,
    metadata = {}
  } = options;

  const sections = [];

  // Cover page section
  if (includeCoverPage) {
    sections.push({
      properties: {
        page: {
          size: { width: PAGE_A4.width, height: PAGE_A4.height },
          margin: PAGE_A4.margins
        }
      },
      children: createCoverPage({
        productName,
        docType,
        docId,
        revisionDate,
        subtitle,
        version
      })
    });
  }

  // Main content section
  const mainChildren = [];

  // Optional TOC
  if (includeTOC) {
    mainChildren.push(
      createHeading('Table of Contents', 1, version),
      new TableOfContents('Table of Contents', {
        hyperlink: true,
        headingStyleRange: '1-3'
      }),
      new Paragraph({
        children: [new PageBreak()]
      })
    );
  }

  // Append content
  mainChildren.push(...content);

  const margins = version === 'A' ? PAGE_A4.margins : {
    top: 1020,
    bottom: 1020,
    left: 1247,
    right: 850
  };

  sections.push({
    properties: {
      page: {
        size: { width: PAGE_A4.width, height: PAGE_A4.height },
        margin: margins
      }
    },
    headers: {
      default: createHeader(productName, docType)
    },
    footers: {
      default: createFooter(docId, revisionDate)
    },
    children: mainChildren
  });

  const docOptions = {
    creator: metadata.creator || 'WakeCap Technologies',
    title: metadata.title || `${productName} ${docType}`,
    subject: metadata.subject || `WakeCap ${productName} - ${docType}`,
    description: metadata.description || `Generated by WakeCap Documentation Expert`,
    keywords: metadata.keywords || `WakeCap, ${productName}, ${docType}, IoT`,
    styles: getDocumentStyles(version),
    sections
  };

  return new Document(docOptions);
}

// =============================================================================
// DOCUMENT STYLES DEFINITION
// =============================================================================

function getDocumentStyles(version = 'A') {
  const sizes = version === 'A' ? FONT_SIZES.versionA : FONT_SIZES.versionB;
  
  return {
    default: {
      document: {
        run: {
          font: 'Source Sans Pro',
          size: sizes.body
        }
      }
    },
    paragraphStyles: [
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: {
          size: sizes.h1,
          bold: true,
          font: 'Source Sans Pro',
          color: version === 'A' ? COLORS.wakecapBlue : COLORS.charcoal
        },
        paragraph: {
          spacing: { before: 0, after: SPACING[version === 'A' ? 'versionA' : 'versionB'].h1After },
          outlineLevel: 0
        }
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: {
          size: sizes.h2,
          bold: true,
          font: 'Source Sans Pro',
          color: version === 'A' ? COLORS.wakecapBlue : COLORS.charcoal
        },
        paragraph: {
          spacing: {
            before: SPACING[version === 'A' ? 'versionA' : 'versionB'].h2Before,
            after: SPACING[version === 'A' ? 'versionA' : 'versionB'].h2After
          },
          outlineLevel: 1
        }
      },
      {
        id: 'Heading3',
        name: 'Heading 3',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: {
          size: sizes.h3,
          bold: true,
          font: 'Source Sans Pro',
          color: COLORS.charcoal
        },
        paragraph: {
          spacing: {
            before: SPACING[version === 'A' ? 'versionA' : 'versionB'].h3Before,
            after: SPACING[version === 'A' ? 'versionA' : 'versionB'].h3After
          },
          outlineLevel: 2
        }
      }
    ]
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

module.exports = {
  // Constants
  COLORS,
  FONT_SIZES,
  SPACING,
  PAGE_A4,
  DOCUMENT_TYPES,
  PRODUCT_CODES,
  // Content helpers
  createHeading,
  createBodyText,
  createPlaceholder,
  createBullet,
  createNumberedStep,
  createSpacer,
  // Complex components
  createSpecTable,
  createCalloutBox,
  createSafetyPanel,
  createImagePlaceholder,
  createImage,
  // Page structure
  createHeader,
  createFooter,
  createCoverPage,
  // Document builders
  buildDocument,
  getDocumentStyles,
  // Re-export docx classes for convenience
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  Header,
  Footer,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  VerticalAlign,
  PageBreak,
  PageNumber,
  TableOfContents,
  ImageRun
};
