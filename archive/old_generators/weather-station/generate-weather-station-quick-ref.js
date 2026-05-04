/**
 * WakeCap Weather Station Quick Reference Card Generator
 * Generates WC-WS-QR-v1.0.docx
 * Landscape format, 2 pages max
 */

const {
  COLORS,
  FONT_SIZES,
  PAGE_A4,
  createSpecTable,
  createSafetyPanel,
  getDocumentStyles,
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
  PageBreak
} = require('../../templates/docx-generator.js');

const fs = require('fs');

const DOC_ID = 'WC-WS-QR-v1.0';
const REVISION_DATE = '2026-02-04';

// Landscape A4 dimensions
const PAGE_LANDSCAPE = {
  width: 16838,  // A4 height becomes width
  height: 11906, // A4 width becomes height
  margins: { top: 720, bottom: 720, left: 720, right: 720 }
};

function createQRHeading(text) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 22,
        font: 'Source Sans Pro',
        color: COLORS.wakecapBlue
      })
    ]
  });
}

function createQRText(text, bold = false) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({
        text: text,
        bold: bold,
        size: 18,
        font: 'Source Sans Pro',
        color: COLORS.charcoal
      })
    ]
  });
}

function createQRBullet(text) {
  return new Paragraph({
    spacing: { after: 30 },
    children: [
      new TextRun({
        text: '• ' + text,
        size: 18,
        font: 'Source Sans Pro',
        color: COLORS.charcoal
      })
    ]
  });
}

async function generateQuickRef() {
  const contentWidth = PAGE_LANDSCAPE.width - PAGE_LANDSCAPE.margins.left - PAGE_LANDSCAPE.margins.right;
  const colWidth = Math.floor(contentWidth / 3);
  const border = { style: BorderStyle.SINGLE, size: 1, color: COLORS.borderGray };

  const doc = new Document({
    styles: getDocumentStyles('B'), // Use compact Version B styling
    sections: [
      // PAGE 1 - FRONT
      {
        properties: {
          page: {
            size: { width: PAGE_LANDSCAPE.width, height: PAGE_LANDSCAPE.height },
            margin: PAGE_LANDSCAPE.margins
          }
        },
        children: [
          // HEADER BAR
          new Table({
            width: { size: contentWidth, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: colWidth, type: WidthType.DXA },
                    shading: { fill: COLORS.wakecapBlue, type: ShadingType.CLEAR },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: '[WakeCap Logo]', bold: true, size: 20, font: 'Source Sans Pro', color: COLORS.white })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    width: { size: colWidth, type: WidthType.DXA },
                    shading: { fill: COLORS.wakecapBlue, type: ShadingType.CLEAR },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: 'QUICK REFERENCE: Weather Station', bold: true, size: 22, font: 'Source Sans Pro', color: COLORS.white })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    width: { size: colWidth, type: WidthType.DXA },
                    shading: { fill: COLORS.wakecapBlue, type: ShadingType.CLEAR },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({ text: `${DOC_ID}  Rev: 1.0`, size: 18, font: 'Source Sans Pro', color: COLORS.white })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 200 }, children: [] }),

          // MAIN 3-COLUMN CONTENT
          new Table({
            width: { size: contentWidth, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  // COLUMN 1: COMPONENT OVERVIEW
                  new TableCell({
                    width: { size: colWidth, type: WidthType.DXA },
                    borders: { right: border },
                    margins: { top: 80, bottom: 80, left: 120, right: 200 },
                    children: [
                      createQRHeading('COMPONENT OVERVIEW'),
                      new Paragraph({ spacing: { after: 80 }, children: [] }),

                      // Image placeholder
                      new Table({
                        width: { size: colWidth - 400, type: WidthType.DXA },
                        rows: [
                          new TableRow({
                            height: { value: 2000, rule: 'atLeast' },
                            children: [
                              new TableCell({
                                borders: { top: { style: BorderStyle.DASHED, size: 8, color: COLORS.gray }, bottom: { style: BorderStyle.DASHED, size: 8, color: COLORS.gray }, left: { style: BorderStyle.DASHED, size: 8, color: COLORS.gray }, right: { style: BorderStyle.DASHED, size: 8, color: COLORS.gray } },
                                shading: { fill: COLORS.lightGray, type: ShadingType.CLEAR },
                                children: [
                                  new Paragraph({
                                    alignment: AlignmentType.CENTER,
                                    children: [
                                      new TextRun({ text: '[IMAGE: WS Box with numbered callouts]', italics: true, size: 16, font: 'Source Sans Pro', color: COLORS.slate })
                                    ]
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      }),

                      new Paragraph({ spacing: { after: 80 }, children: [] }),
                      createQRText('1. LCD Display - live readings'),
                      createQRText('2. Sensor Terminals (T1-T6)'),
                      createQRText('3. RS485 Terminals (A, B)'),
                      createQRText('4. Power Input (12V DC)'),
                      createQRText('5. MODBUS Asset'),
                      createQRText('6. LED Status Indicator')
                    ]
                  }),

                  // COLUMN 2: LED STATUS & DISPLAY
                  new TableCell({
                    width: { size: colWidth, type: WidthType.DXA },
                    borders: { right: border },
                    margins: { top: 80, bottom: 80, left: 120, right: 200 },
                    children: [
                      createQRHeading('LED STATUS'),
                      createQRText('● 1 blink/min = Normal'),
                      createQRText('● 2 blinks/min = RS485 Error'),
                      createQRText('○ No blinks = No Power'),
                      new Paragraph({ spacing: { after: 120 }, children: [] }),

                      createQRHeading('DISPLAY READINGS'),
                      createQRText('Values shown = Normal'),
                      createQRText('All zeros = Sensor issue'),
                      createQRText('Blank = Power issue'),
                      new Paragraph({ spacing: { after: 120 }, children: [] }),

                      createQRHeading('SENSORS'),
                      createQRText('T1: Wind Speed (m/s)'),
                      createQRText('T2: Wind Direction (°)'),
                      createQRText('T3: Temperature (°C)'),
                      createQRText('T4: Humidity (%)'),
                      createQRText('T5: Pressure (hPa)'),
                      createQRText('T6: Rainfall (mm)'),
                      new Paragraph({ spacing: { after: 80 }, children: [] }),
                      createQRText('Gas sensors: Additional terminals', false)
                    ]
                  }),

                  // COLUMN 3: SPECIFICATIONS & WIRING
                  new TableCell({
                    width: { size: colWidth, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      createQRHeading('SPECIFICATIONS'),
                      createQRText('Power: 12V DC'),
                      createQRText('Protocol: RS485 / MODBUS RTU'),
                      createQRText('Wireless: Mesh network'),
                      createQRText('Cloud: HTTPS'),
                      createQRText('Display: LCD'),
                      new Paragraph({ spacing: { after: 120 }, children: [] }),

                      createQRHeading('RS485 WIRING'),
                      new Paragraph({
                        spacing: { after: 60 },
                        children: [
                          new TextRun({ text: 'WS Box    MODBUS Asset', size: 18, font: 'Roboto Mono', color: COLORS.charcoal })
                        ]
                      }),
                      new Paragraph({
                        spacing: { after: 40 },
                        children: [
                          new TextRun({ text: '  A  ─────────  A', size: 18, font: 'Roboto Mono', color: COLORS.charcoal })
                        ]
                      }),
                      new Paragraph({
                        spacing: { after: 80 },
                        children: [
                          new TextRun({ text: '  B  ─────────  B', size: 18, font: 'Roboto Mono', color: COLORS.charcoal })
                        ]
                      }),
                      new Paragraph({
                        shading: { fill: '#FEF3C7', type: ShadingType.CLEAR },
                        spacing: { after: 80 },
                        children: [
                          new TextRun({ text: '⚠ A→A, B→B (never cross!)', bold: true, size: 16, font: 'Source Sans Pro', color: COLORS.charcoal })
                        ]
                      }),
                      new Paragraph({ spacing: { after: 80 }, children: [] }),

                      createQRHeading('POWER SYSTEM'),
                      createQRText('Solar → MPPT → Battery → WS Box'),
                      createQRText('Min battery: 12V+')
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 100 }, children: [] }),

          // TROUBLESHOOTING BAR
          new Table({
            width: { size: contentWidth, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: contentWidth, type: WidthType.DXA },
                    shading: { fill: COLORS.lightGray, type: ShadingType.CLEAR },
                    borders: { top: border, bottom: border, left: border, right: border },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'TROUBLESHOOTING: ', bold: true, size: 18, font: 'Source Sans Pro', color: COLORS.wakecapBlue }),
                          new TextRun({ text: 'No LED = Check power  │  2 blinks = Check RS485 wiring  │  LCD zeros = Check sensors  │  No dashboard = Check gateway/mesh', size: 18, font: 'Source Sans Pro', color: COLORS.charcoal })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 60 }, children: [] }),

          // FOOTER
          new Paragraph({
            children: [
              new TextRun({ text: 'Support: support@wakecap.com  │  Docs: WC-WS-PM-v1.0 (Full Manual), WC-WS-TG-v1.0 (Troubleshooting)', size: 16, font: 'Source Sans Pro', color: COLORS.slate }),
              new TextRun({ text: '\t\t© 2026 WakeCap Technologies', size: 16, font: 'Source Sans Pro', color: COLORS.slate })
            ]
          }),

          new Paragraph({ children: [new PageBreak()] })
        ]
      },

      // PAGE 2 - BACK (System Diagram & Maintenance)
      {
        properties: {
          page: {
            size: { width: PAGE_LANDSCAPE.width, height: PAGE_LANDSCAPE.height },
            margin: PAGE_LANDSCAPE.margins
          }
        },
        children: [
          // HEADER BAR
          new Table({
            width: { size: contentWidth, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: contentWidth, type: WidthType.DXA },
                    shading: { fill: COLORS.wakecapBlue, type: ShadingType.CLEAR },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: 'QUICK REFERENCE: Weather Station - System Overview', bold: true, size: 22, font: 'Source Sans Pro', color: COLORS.white })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 200 }, children: [] }),

          // SYSTEM DIAGRAM PLACEHOLDER
          new Table({
            width: { size: contentWidth, type: WidthType.DXA },
            rows: [
              new TableRow({
                height: { value: 2400, rule: 'atLeast' },
                children: [
                  new TableCell({
                    width: { size: contentWidth, type: WidthType.DXA },
                    borders: { top: { style: BorderStyle.DASHED, size: 8, color: COLORS.gray }, bottom: { style: BorderStyle.DASHED, size: 8, color: COLORS.gray }, left: { style: BorderStyle.DASHED, size: 8, color: COLORS.gray }, right: { style: BorderStyle.DASHED, size: 8, color: COLORS.gray } },
                    shading: { fill: COLORS.lightGray, type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 400 },
                        children: [
                          new TextRun({ text: '[IMAGE: Complete System Diagram]', italics: true, size: 20, font: 'Source Sans Pro', color: COLORS.slate })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: 'SENSORS → WS BOX → MODBUS ASSET → (wireless) → ANCHORS → GATEWAY → (internet) → CLOUD → DASHBOARD', size: 18, font: 'Roboto Mono', color: COLORS.slate })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: 'SOLAR PANEL → MPPT → BATTERY → WS BOX', size: 18, font: 'Roboto Mono', color: COLORS.slate })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 200 }, children: [] }),

          // 3-COLUMN: MAINTENANCE, VERIFICATION, SUPPORT
          new Table({
            width: { size: contentWidth, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  // MAINTENANCE
                  new TableCell({
                    width: { size: colWidth, type: WidthType.DXA },
                    borders: { right: border },
                    margins: { top: 80, bottom: 80, left: 120, right: 200 },
                    children: [
                      createQRHeading('MAINTENANCE'),
                      createQRText('Monthly:', true),
                      createQRBullet('Visual inspection'),
                      createQRBullet('Check connections'),
                      createQRBullet('Clean rainfall funnel'),
                      createQRBullet('Verify dashboard data'),
                      new Paragraph({ spacing: { after: 60 }, children: [] }),
                      createQRText('Annually:', true),
                      createQRBullet('Full calibration'),
                      createQRBullet('Replace gas sensors'),
                      createQRBullet('Firmware update')
                    ]
                  }),

                  // FIELD VERIFICATION
                  new TableCell({
                    width: { size: colWidth, type: WidthType.DXA },
                    borders: { right: border },
                    margins: { top: 80, bottom: 80, left: 120, right: 200 },
                    children: [
                      createQRHeading('FIELD VERIFICATION'),
                      createQRText('Physical Checks:', true),
                      createQRBullet('WS Box LCD = ON + values'),
                      createQRBullet('MODBUS LED = 1 blink/min'),
                      createQRBullet('MPPT = charging indicator'),
                      createQRBullet('Battery = 12V+'),
                      new Paragraph({ spacing: { after: 60 }, children: [] }),
                      createQRText('App/Dashboard:', true),
                      createQRBullet('Device status = Online'),
                      createQRBullet('Data updating'),
                      createQRBullet('Mesh path connected')
                    ]
                  }),

                  // SUPPORT & DOCS
                  new TableCell({
                    width: { size: colWidth, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      createQRHeading('DOCUMENTATION'),
                      createQRText('WC-WS-PM-v1.0', true),
                      createQRBullet('Full Product Manual'),
                      new Paragraph({ spacing: { after: 40 }, children: [] }),
                      createQRText('WC-WS-SG-v1.0', true),
                      createQRBullet('Setup Guide'),
                      new Paragraph({ spacing: { after: 40 }, children: [] }),
                      createQRText('WC-WS-TG-v1.0', true),
                      createQRBullet('Troubleshooting Guide'),
                      new Paragraph({ spacing: { after: 80 }, children: [] }),
                      createQRHeading('SUPPORT'),
                      createQRText('support@wakecap.com'),
                      createQRText('www.wakecap.com')
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 100 }, children: [] }),

          // SAFETY REMINDER
          new Table({
            width: { size: contentWidth, type: WidthType.DXA },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: contentWidth, type: WidthType.DXA },
                    shading: { fill: '#FEF3C7', type: ShadingType.CLEAR },
                    borders: { top: border, bottom: border, left: { style: BorderStyle.SINGLE, size: 24, color: COLORS.warning }, right: border },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: '⚠ SAFETY: ', bold: true, size: 18, font: 'Source Sans Pro', color: COLORS.charcoal }),
                          new TextRun({ text: 'Always de-energize before maintenance. Check gas readings before entering monitored areas. Follow site-specific safety procedures.', size: 18, font: 'Source Sans Pro', color: COLORS.charcoal })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 60 }, children: [] }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: `${DOC_ID}  │  ${REVISION_DATE}  │  © 2026 WakeCap Technologies  │  Print, laminate, and keep on-site`, size: 16, font: 'Source Sans Pro', color: COLORS.slate })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync('./output/WC-WS-QR-v1.0.docx', buffer);
  console.log('✓ Generated: ./output/WC-WS-QR-v1.0.docx');
}

generateQuickRef().catch(console.error);
