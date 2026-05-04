const {
  COLORS, FONT_SIZES, SPACING,
  createFooter,
  getDocumentStyles,
  Document, Packer, Paragraph, TextRun,
  Table, TableRow, TableCell,
  Header, ImageRun,
  AlignmentType, HeadingLevel,
  BorderStyle, WidthType, ShadingType
} = require('../../templates/docx-generator');
const { VerticalAlign, PageOrientation } = require('docx');
const fs = require('fs');
const path = require('path');

const version = 'A';
const DOC_ID = 'WC-PS-PC-v1.1';
const REVISION_DATE = 'February 2026';
const sizes = FONT_SIZES.versionA;

// Power Solutions accent color — dark grey instead of blue
const PS_ACCENT = '212121';
const PS_ACCENT_LIGHT = 'C8C8C8'; // lighter grey for badge sub-labels

// Logo images
const LOGO_PATH = path.resolve(__dirname, '../../output/LOGOTYPE.png');
const logoBuffer = fs.readFileSync(LOGO_PATH);
const LOGOMARK_PATH = path.resolve(__dirname, '../../output/LOGOMARK.png');
const logomarkBuffer = fs.readFileSync(LOGOMARK_PATH);

// Product images
const IMG_DIR = path.resolve(__dirname, '../../output/power-solutions/images');
const productImages = {
  'WP-384': fs.readFileSync(path.join(IMG_DIR, 'WP-384.png')),
  'WP-768': fs.readFileSync(path.join(IMG_DIR, 'WP-768.png')),
  'WP-4800T': fs.readFileSync(path.join(IMG_DIR, 'WP-4800T.png')),
  'WP-21600T': fs.readFileSync(path.join(IMG_DIR, 'WP-21600T.png'))
};

// Landscape A4: width=long side, height=short side, orientation=LANDSCAPE
const PAGE_LANDSCAPE = {
  width: 16838,   // 297mm (long side as width)
  height: 11906,  // 210mm (short side as height)
  orientation: PageOrientation.LANDSCAPE,
  margins: {
    top: 720,     // ~12.7mm
    bottom: 720,
    left: 720,    // ~12.7mm
    right: 720
  }
};

const contentWidth = PAGE_LANDSCAPE.width - PAGE_LANDSCAPE.margins.left - PAGE_LANDSCAPE.margins.right;
const leftColWidth = Math.floor(contentWidth * 0.35);
const rightColWidth = contentWidth - leftColWidth;

const noBorder = { style: BorderStyle.NIL, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: COLORS.borderGray };
const thinBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

// ---- Helper: Header — WAKECAP logo TOP RIGHT only ----
function createPSHeader() {
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
            data: logoBuffer,
            transformation: { width: 150, height: 23 },
            type: 'png'
          })
        ]
      })
    ]
  });
}

// ---- Helper: Spec table optimized for landscape ----
function createLandscapeSpecTable(headers, rows) {
  const colCount = headers.length;
  const colWidth = Math.floor(contentWidth / colCount);

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(h =>
      new TableCell({
        borders: thinBorders,
        width: { size: colWidth, type: WidthType.DXA },
        shading: { fill: PS_ACCENT, type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 60, left: 100, right: 100 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({
          children: [new TextRun({ text: h, bold: true, size: 17, font: 'Source Sans Pro', color: COLORS.white })]
        })]
      })
    )
  });

  const dataRows = rows.map((row, i) =>
    new TableRow({
      children: row.map(cell =>
        new TableCell({
          borders: thinBorders,
          width: { size: colWidth, type: WidthType.DXA },
          shading: { fill: i % 2 === 0 ? COLORS.white : COLORS.lightGray, type: ShadingType.CLEAR },
          margins: { top: 40, bottom: 40, left: 100, right: 100 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({
            children: [new TextRun({ text: cell, size: 16, font: 'Source Sans Pro', color: COLORS.charcoal })]
          })]
        })
      )
    })
  );

  return new Table({
    width: { size: contentWidth, type: WidthType.DXA },
    rows: [headerRow, ...dataRows]
  });
}

// ---- Helper: Image placeholder for left column ----
function createLeftImage(description, imageBuffer) {
  if (imageBuffer) {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({
          data: imageBuffer,
          transformation: { width: 220, height: 220 },
          type: 'png'
        })
      ]
    });
  }
  const dashedBorder = { style: BorderStyle.DASHED, size: 12, color: COLORS.gray };
  return new Table({
    width: { size: leftColWidth - 300, type: WidthType.DXA },
    rows: [new TableRow({
      height: { value: 4200, rule: 'atLeast' },
      children: [new TableCell({
        borders: { top: dashedBorder, bottom: dashedBorder, left: dashedBorder, right: dashedBorder },
        width: { size: leftColWidth - 300, type: WidthType.DXA },
        shading: { fill: COLORS.lightGray, type: ShadingType.CLEAR },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 160, bottom: 160, left: 160, right: 160 },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({
            text: `[IMAGE: ${description}]`,
            italics: true, size: 18, font: 'Source Sans Pro', color: COLORS.slate
          })]
        })]
      })]
    })]
  });
}

// ---- Helper: Highlight badge ----
function createBadge(label, value) {
  return new Table({
    width: { size: Math.floor((rightColWidth - 400) / 3), type: WidthType.DXA },
    rows: [new TableRow({
      children: [new TableCell({
        borders: noBorders,
        shading: { fill: PS_ACCENT, type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 60, left: 80, right: 80 },
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 20 },
            children: [new TextRun({ text: value, bold: true, size: 22, font: 'Source Sans Pro', color: COLORS.white })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: label, size: 14, font: 'Source Sans Pro', color: PS_ACCENT_LIGHT })]
          })
        ]
      })]
    })]
  });
}

// ---- Product Data ----
const products = [
  {
    name: 'WakeCap Power 384',
    model: 'WP-384',
    subtitle: '80W Solar | 384Wh LiFePO\u2084 | Off-Grid Power System',
    imageDesc: 'WP-384 complete system \u2014 compact pole-mounted unit with integrated controller box, battery arm, two 40W solar panels in butterfly configuration, LED indicators on front panel',
    description: 'Ultra-compact, pole-mounted solar power system for lightweight remote equipment. Integrated MPPT controller with BMS, LiFePO\u2084 battery, and IP66 enclosure for harsh desert and coastal environments.',
    badges: [
      { label: 'Solar Power', value: '80W' },
      { label: 'Battery', value: '384Wh' },
      { label: 'Max Load', value: '8W' }
    ],
    features: [
      'Integrated MPPT controller (>95% efficiency) with BMS',
      'LiFePO\u2084 battery, 2000\u20135000 cycle life',
      'IP66 dust-tight, water-jet resistant',
      'LED indicators: charge, output, battery',
      'Optional RS485 remote monitoring',
      'Pole/wall mount (60\u2013150mm pole)'
    ],
    specs: [
      ['Model', 'G8030 (TD-G8030)', '\u2014'],
      ['Solar Panels', '2 x 40W Grade-A Mono', '80W total'],
      ['Panel Efficiency', '\u226523%', '\u2014'],
      ['Battery', 'LiFePO\u2084, 2P4S', '30Ah / 384Wh'],
      ['Output Voltage', '12 \u00b10.5 V DC', '\u2014'],
      ['Max Output Current', '3A', '\u2014'],
      ['Runtime (no solar)', '8\u201310 days @150mA', '\u2014'],
      ['Recharge Time', '8\u201310 hours', '\u2014'],
      ['Operating Temp', '-20 to +50\u00b0C', '\u2014'],
      ['Protection', 'IP66', '\u2014'],
      ['Dimensions (panels)', '390\u00d7530\u00d717 mm (\u00d72)', '\u2014'],
      ['Installation', 'Pole / Wall Mount', '\u2014']
    ]
  },
  {
    name: 'WakeCap Power 768',
    model: 'WP-768',
    subtitle: '100W Solar | 768Wh LiFePO\u2084 | Off-Grid Power System',
    imageDesc: 'WP-768 complete system \u2014 modular pole-mounted unit with battery enclosure, MPPT controller, two 50W solar panels, adjustable tilt bracket, aviation waterproof connectors',
    description: 'Modular pole-mounted solar power system for medium-demand remote equipment. Standalone 10A MPPT controller, 60Ah LiFePO\u2084 battery, and aviation-style waterproof connectors for reliable field connections.',
    badges: [
      { label: 'Solar Power', value: '100W' },
      { label: 'Battery', value: '768Wh' },
      { label: 'Max Load', value: '15W' }
    ],
    features: [
      '10A MPPT controller, 96.5% efficiency',
      '60Ah LiFePO\u2084 with integrated BMS',
      'N-Type A+ Grade mono panels, >22%',
      'Aviation waterproof connectors',
      'Adjustable panel tilt 0\u201330\u00b0',
      'Controller self-consumption: 0.06W'
    ],
    specs: [
      ['Model', 'TS-100W60AH', '\u2014'],
      ['Solar Panels', '2 x 50W N-Type A+ Mono', '100W total'],
      ['Panel Efficiency', '>22%', '\u2014'],
      ['Battery', 'LiFePO\u2084', '60Ah / 768Wh'],
      ['Voltage Range', '10.5\u201312.6 V DC', '\u2014'],
      ['Max Current (In/Out)', '10A / 10A', '\u2014'],
      ['MPPT Efficiency', '96.5%', '\u2014'],
      ['Operating Temp', '-30 to +85\u00b0C', '\u2014'],
      ['Protection', 'IP66', '\u2014'],
      ['System Weight', '23 kg', '\u2014'],
      ['Package Size', '940\u00d7780\u00d7240 mm', '\u2014'],
      ['Output Connector', '5.5\u00d72.1mm DC', '\u2014']
    ]
  },
  {
    name: 'WakeCap Power 4800T',
    model: 'WP-4800T',
    subtitle: '450W Solar | 4800Wh GEL | Trailer-Mounted Power Station',
    imageDesc: 'WP-4800T trailer power station \u2014 single-axle trailer, three 150W solar panels, 6.5m pneumatic mast extended, equipment cabinet, outriggers deployed, in desert setting',
    description: 'Mobile trailer-mounted solar power station for temporary and semi-permanent deployments. 6.5m pneumatic mast, 400Ah GEL battery bank, and integrated equipment cabinet with thermal management. Available in two output variants: WP-4800T-DC (12V DC) and WP-4800T-AC (220V AC).',
    badges: [
      { label: 'Solar Power', value: '450W' },
      { label: 'Battery', value: '4.8kWh' },
      { label: 'Max Load', value: '100W' }
    ],
    features: [
      '6.5m pneumatic mast (5 sections, Al alloy)',
      '2\u00d7200Ah LEOCH GEL batteries (400Ah)',
      '30A MPPT charge controller',
      'Equipment cabinet with fan cooling',
      'DC variant (WP-4800T-DC): 12V DC output',
      'AC variant (WP-4800T-AC): 220V AC output'
    ],
    specs: [
      ['Model', 'WP-4800T', '\u2014'],
      ['Variants', 'WP-4800T-DC / WP-4800T-AC', '\u2014'],
      ['DC Output', '12 V DC', 'WP-4800T-DC'],
      ['AC Output', '220 V AC', 'WP-4800T-AC'],
      ['Solar Panels', '3 x 150W Monocrystalline', '450W total'],
      ['Battery', 'GEL Deep Cycle (LEOCH)', '400Ah / 4800Wh'],
      ['MPPT Rating', '30A', '\u2014'],
      ['Runtime (180W load)', '~25 hours', '\u2014'],
      ['Mast', 'Pneumatic, 6.5m', '5 sections'],
      ['System Weight', '525 kg', '\u2014'],
      ['Packed Size', '2000\u00d71400\u00d72300 mm', '\u2014'],
      ['Protection', 'IP65', '2yr warranty']
    ]
  },
  {
    name: 'WakeCap Power 21600T',
    model: 'WP-21600T',
    subtitle: '1305W Solar | 21.6kWh Lead Acid | Heavy-Duty Trailer Power Station',
    imageDesc: 'WP-21600T heavy-duty trailer \u2014 large single-axle trailer, three 435W panels, 9m manual mast with camera box, mechanical brake, steel plate spring suspension, at construction site',
    description: 'Highest-capacity trailer power station in the WakeCap portfolio. 9m manual mast, 900Ah high-temperature lead-acid battery bank (24V), and EPEVER 60A MPPT controller for heavy-duty applications. Available in two output variants: WP-21600T-DC (24V DC) and WP-21600T-AC (220V AC).',
    badges: [
      { label: 'Solar Power', value: '1305W' },
      { label: 'Battery', value: '21.6kWh' },
      { label: 'Max Load', value: '350W' }
    ],
    features: [
      '9m manual mast with CAT6 + power routing',
      '6\u00d7150Ah lead-acid batteries (3S2P, 24V)',
      'EPEVER 60A MPPT, 98% efficiency',
      '3\u00d7435W mono panels (1305W total)',
      'DC variant (WP-21600T-DC): 24V DC output',
      'AC variant (WP-21600T-AC): 220V AC output'
    ],
    specs: [
      ['Model', 'WP-21600T', '\u2014'],
      ['Variants', 'WP-21600T-DC / WP-21600T-AC', '\u2014'],
      ['DC Output', '24 V DC', 'WP-21600T-DC'],
      ['AC Output', '220 V AC', 'WP-21600T-AC'],
      ['Solar Panels', '3 x 435W Monocrystalline', '1305W total'],
      ['Battery', 'High-Temp Lead Acid, 3S2P', '900Ah / 21,600Wh'],
      ['MPPT Controller', 'EPEVER 60A', '98% eff.'],
      ['Max PV Input', '150V', '\u2014'],
      ['Mast', 'Manual, 9m', 'CAT6 + power'],
      ['Camera Box', '412\u00d7412\u00d7416 mm', '\u2014'],
      ['System Weight', '1300 kg', '\u2014'],
      ['Protection / Wind', 'IP65', '100 km/h']
    ]
  }
];

// ---- Build Sections ----
const allSections = [];

// Cover page (landscape) — logo image instead of text
allSections.push({
  properties: {
    page: {
      size: { width: PAGE_LANDSCAPE.width, height: PAGE_LANDSCAPE.height, orientation: PageOrientation.LANDSCAPE },
      margin: PAGE_LANDSCAPE.margins
    }
  },
  children: [
    new Paragraph({ spacing: { before: 1800 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new ImageRun({
          data: logomarkBuffer,
          transformation: { width: 130, height: 104 },
          type: 'png'
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [new TextRun({ text: 'POWER SOLUTIONS', bold: true, size: 60, font: 'Source Sans Pro', color: COLORS.charcoal })]
    }),
    // Decorative line — grey instead of blue
    new Table({
      width: { size: 6000, type: WidthType.DXA },
      rows: [new TableRow({
        height: { value: 60, rule: 'exact' },
        children: [new TableCell({
          borders: noBorders,
          shading: { fill: PS_ACCENT, type: ShadingType.CLEAR },
          width: { size: 6000, type: WidthType.DXA },
          children: [new Paragraph({ children: [] })]
        })]
      })],
      alignment: AlignmentType.CENTER
    }),
    new Paragraph({ spacing: { before: 300 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 150 },
      children: [new TextRun({ text: 'Product Catalogue', size: 40, font: 'Source Sans Pro', color: COLORS.slate })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [new TextRun({ text: 'Off-Grid Solar Power Systems for Remote Equipment', size: 24, font: 'Source Sans Pro', color: COLORS.slate, italics: true })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: 'WP-384   \u2022   WP-768   \u2022   WP-4800T   \u2022   WP-21600T', size: 24, font: 'Source Sans Pro', color: PS_ACCENT, bold: true })]
    }),
    new Paragraph({ spacing: { before: 1200 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `${DOC_ID}  |  ${REVISION_DATE}`, size: 18, font: 'Source Sans Pro', color: COLORS.gray })]
    })
  ]
});

// Product pages (landscape, two-column layout)
products.forEach((product) => {
  // Build right column content
  const rightChildren = [];

  // Product name — grey accent instead of blue
  rightChildren.push(new Paragraph({
    spacing: { after: 40 },
    children: [new TextRun({ text: product.name, bold: true, size: 36, font: 'Source Sans Pro', color: PS_ACCENT })]
  }));

  // Model badge — grey accent
  rightChildren.push(new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: product.model, bold: true, size: 20, font: 'Source Sans Pro', color: COLORS.white, shading: { type: ShadingType.CLEAR, fill: PS_ACCENT } })]
  }));

  // Subtitle
  rightChildren.push(new Paragraph({
    spacing: { after: 160 },
    children: [new TextRun({ text: product.subtitle, size: 18, font: 'Source Sans Pro', color: COLORS.slate, italics: true })]
  }));

  // Description
  rightChildren.push(new Paragraph({
    spacing: { after: 160 },
    children: [new TextRun({ text: product.description, size: 18, font: 'Source Sans Pro', color: COLORS.charcoal })]
  }));

  // Features header — grey accent
  rightChildren.push(new Paragraph({
    spacing: { before: 80, after: 60 },
    children: [new TextRun({ text: 'KEY FEATURES', bold: true, size: 18, font: 'Source Sans Pro', color: PS_ACCENT })]
  }));

  // Features list — grey checkmarks
  product.features.forEach(f => {
    rightChildren.push(new Paragraph({
      spacing: { after: 30 },
      children: [
        new TextRun({ text: '\u2713 ', bold: true, size: 17, font: 'Source Sans Pro', color: PS_ACCENT }),
        new TextRun({ text: f, size: 17, font: 'Source Sans Pro', color: COLORS.charcoal })
      ]
    }));
  });

  // Top section: two-column layout (image left, details right)
  const topLayout = new Table({
    width: { size: contentWidth, type: WidthType.DXA },
    columnWidths: [leftColWidth, rightColWidth],
    rows: [new TableRow({
      children: [
        // Left: Image
        new TableCell({
          borders: noBorders,
          width: { size: leftColWidth, type: WidthType.DXA },
          verticalAlign: VerticalAlign.TOP,
          margins: { top: 0, bottom: 0, left: 0, right: 200 },
          children: [
            createLeftImage(product.imageDesc, productImages[product.model]),
            new Paragraph({ spacing: { before: 120 } }),
            // Badges row under image — grey accent
            new Table({
              width: { size: leftColWidth - 300, type: WidthType.DXA },
              rows: [new TableRow({
                children: product.badges.map(b =>
                  new TableCell({
                    borders: noBorders,
                    shading: { fill: PS_ACCENT, type: ShadingType.CLEAR },
                    width: { size: Math.floor((leftColWidth - 300) / 3), type: WidthType.DXA },
                    margins: { top: 60, bottom: 60, left: 40, right: 40 },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 10 },
                        children: [new TextRun({ text: b.value, bold: true, size: 20, font: 'Source Sans Pro', color: COLORS.white })]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: b.label, size: 13, font: 'Source Sans Pro', color: PS_ACCENT_LIGHT })]
                      })
                    ]
                  })
                )
              })]
            })
          ]
        }),
        // Right: Details
        new TableCell({
          borders: noBorders,
          width: { size: rightColWidth, type: WidthType.DXA },
          verticalAlign: VerticalAlign.TOP,
          margins: { top: 0, bottom: 0, left: 200, right: 0 },
          children: rightChildren
        })
      ]
    })]
  });

  // Specs table header — grey accent
  const specsHeader = new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text: 'TECHNICAL SPECIFICATIONS', bold: true, size: 18, font: 'Source Sans Pro', color: PS_ACCENT })]
  });

  // Specs in two side-by-side tables for landscape
  const halfSpecs = Math.ceil(product.specs.length / 2);
  const specsLeft = product.specs.slice(0, halfSpecs);
  const specsRight = product.specs.slice(halfSpecs);

  const halfWidth = Math.floor((contentWidth - 200) / 2);
  const specColWidths = [Math.floor(halfWidth * 0.45), Math.floor(halfWidth * 0.35), Math.floor(halfWidth * 0.20)];

  function makeHalfSpecTable(rows) {
    const hdrRow = new TableRow({
      tableHeader: true,
      children: ['Parameter', 'Value', 'Unit'].map((h, idx) =>
        new TableCell({
          borders: thinBorders,
          width: { size: specColWidths[idx], type: WidthType.DXA },
          shading: { fill: PS_ACCENT, type: ShadingType.CLEAR },
          margins: { top: 40, bottom: 40, left: 80, right: 80 },
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 15, font: 'Source Sans Pro', color: COLORS.white })] })]
        })
      )
    });
    const dRows = rows.map((row, i) =>
      new TableRow({
        children: row.map((cell, idx) =>
          new TableCell({
            borders: thinBorders,
            width: { size: specColWidths[idx], type: WidthType.DXA },
            shading: { fill: i % 2 === 0 ? COLORS.white : COLORS.lightGray, type: ShadingType.CLEAR },
            margins: { top: 30, bottom: 30, left: 80, right: 80 },
            children: [new Paragraph({ children: [new TextRun({ text: cell, size: 15, font: 'Source Sans Pro', color: COLORS.charcoal })] })]
          })
        )
      })
    );
    return new Table({ width: { size: halfWidth, type: WidthType.DXA }, rows: [hdrRow, ...dRows] });
  }

  const specsLayout = new Table({
    width: { size: contentWidth, type: WidthType.DXA },
    columnWidths: [halfWidth, 200, halfWidth],
    rows: [new TableRow({
      children: [
        new TableCell({
          borders: noBorders,
          width: { size: halfWidth, type: WidthType.DXA },
          verticalAlign: VerticalAlign.TOP,
          children: [makeHalfSpecTable(specsLeft)]
        }),
        new TableCell({
          borders: noBorders,
          width: { size: 200, type: WidthType.DXA },
          children: [new Paragraph({ children: [] })]
        }),
        new TableCell({
          borders: noBorders,
          width: { size: halfWidth, type: WidthType.DXA },
          verticalAlign: VerticalAlign.TOP,
          children: [makeHalfSpecTable(specsRight)]
        })
      ]
    })]
  });

  allSections.push({
    properties: {
      page: {
        size: { width: PAGE_LANDSCAPE.width, height: PAGE_LANDSCAPE.height, orientation: PageOrientation.LANDSCAPE },
        margin: PAGE_LANDSCAPE.margins
      }
    },
    headers: { default: createPSHeader() },
    footers: { default: createFooter(DOC_ID, REVISION_DATE) },
    children: [topLayout, specsHeader, specsLayout]
  });
});

// Comparison page (landscape)
const compHeaders = ['Parameter', 'WP-384', 'WP-768', 'WP-4800T', 'WP-21600T'];
const compRows = [
  ['Solar Power', '80W', '100W', '450W', '1305W'],
  ['Panel Config', '2 x 40W', '2 x 50W', '3 x 150W', '3 x 435W'],
  ['Panel Efficiency', '\u226523%', '>22%', '>20%', '>21%'],
  ['Battery Chemistry', 'LiFePO\u2084', 'LiFePO\u2084', 'GEL Lead Acid', 'Lead Acid'],
  ['Battery Capacity', '30Ah / 384Wh', '60Ah / 768Wh', '400Ah / 4.8kWh', '900Ah / 21.6kWh'],
  ['Cycle Life', '2000\u20135000', '2000\u20135000', '500\u2013800', '300\u2013500'],
  ['Calendar Life', '8\u201310 years', '8\u201310 years', '5\u20137 years', '3\u20135 years'],
  ['System Voltage', '12V DC', '12V DC', '12V DC', '24V DC'],
  ['Max Target Load', '8W', '15W', '100W', '350W'],
  ['Max Load (24h)', '~8W', '~15W', '~100W', '~350W'],
  ['MPPT Efficiency', '>95%', '96.5%', '95%', '98%'],
  ['IP Rating', 'IP66', 'IP66', 'IP65', 'IP65'],
  ['Operating Temp', '-20 to +50\u00b0C', '-30 to +85\u00b0C', '-20 to +80\u00b0C', '-20 to +85\u00b0C'],
  ['Form Factor', 'Pole Mount', 'Pole Mount', 'Trailer', 'Trailer'],
  ['Mast', '\u2014', '\u2014', '6.5m Pneumatic', '9m Manual'],
  ['System Weight', '~5.5 kg', '23 kg', '525 kg', '1300 kg'],
  ['Vehicle Access', 'Light vehicle', 'Light vehicle', 'Pickup + trailer', 'Heavy vehicle'],
  ['Ground Area', 'N/A (pole)', 'N/A (pole)', '~4 m\u00b2', '~6 m\u00b2'],
  ['Output Variants', '\u2014', '\u2014', 'DC (12V) / AC (220V)', 'DC (24V) / AC (220V)']
];

allSections.push({
  properties: {
    page: {
      size: { width: PAGE_LANDSCAPE.width, height: PAGE_LANDSCAPE.height, orientation: PageOrientation.LANDSCAPE },
      margin: PAGE_LANDSCAPE.margins
    }
  },
  headers: { default: createPSHeader() },
  footers: { default: createFooter(DOC_ID, REVISION_DATE) },
  children: [
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: 'Product Comparison', bold: true, size: 40, font: 'Source Sans Pro', color: PS_ACCENT })]
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: 'Side-by-side comparison of all WakeCap Power Solutions products.', size: 20, font: 'Source Sans Pro', color: COLORS.slate })]
    }),
    createLandscapeSpecTable(compHeaders, compRows),
    new Paragraph({ spacing: { before: 400 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [new TextRun({ text: 'WakeCap Technologies', bold: true, size: 22, font: 'Source Sans Pro', color: PS_ACCENT })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'Contact: Zishan Shahzad \u2014 zishan.shahzad@wakecap.com', size: 18, font: 'Source Sans Pro', color: COLORS.slate })]
    })
  ]
});

// Build and save
const doc = new Document({
  styles: getDocumentStyles(version),
  sections: allSections
});

const outputDir = path.resolve(__dirname, '../../output/power-solutions');
Packer.toBuffer(doc).then(buffer => {
  const outFile = path.join(outputDir, 'WC-PS-PC-v1.1.docx');
  try {
    fs.writeFileSync(outFile, buffer);
  } catch (e) {
    if (e.code === 'EBUSY') {
      const alt = path.join(outputDir, `WC-PS-PC-v1.1-${Date.now()}.docx`);
      fs.writeFileSync(alt, buffer);
      console.log('WARNING: Original file locked, saved as:', alt);
      return;
    }
    throw e;
  }
  console.log('SUCCESS: WC-PS-PC-v1.1.docx generated (landscape)');
  console.log('Location:', outFile);
}).catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
