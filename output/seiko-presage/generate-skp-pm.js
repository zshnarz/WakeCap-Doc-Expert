/**
 * Seiko Presage — Product Manual Generator
 *
 * Generates WC-SKP-PM-v1.0.docx from structured content using
 * the WakeCap docx-generator base helpers.
 *
 * Version A (Marketing/Sales style)
 */

const path = require('path');
const fs = require('fs');

const {
  // Constants
  COLORS,
  FONT_SIZES,
  SPACING,
  PAGE_A4,
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
  // Page structure
  createHeader,
  createFooter,
  createCoverPage,
  // Document builders
  buildDocument,
  getDocumentStyles,
  // Re-exported docx classes
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  PageBreak,
  PageNumber,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  VerticalAlign,
  TableOfContents,
  ImageRun
} = require('../../old_generators/docx-generator');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const VERSION = 'A';
const DOC_ID = 'WC-SKP-PM-v1.0';
const REVISION_DATE = '2026-04-12';
const PRODUCT_NAME = 'Seiko Presage';
const DOC_TYPE = 'Product Manual';
const SUBTITLE = 'Japanese Mechanical Watchmaking Meets Artisan Craftsmanship';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Page break paragraph */
function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

/** Shorthand for Version A body text */
function body(text) {
  return createBodyText(text, VERSION);
}

/** Shorthand for Version A heading */
function h1(text) { return createHeading(text, 1, VERSION); }
function h2(text) { return createHeading(text, 2, VERSION); }
function h3(text) { return createHeading(text, 3, VERSION); }

/** Shorthand for Version A bullet */
function bullet(text, level) { return createBullet(text, level || 0, VERSION); }

/** Shorthand for numbered step */
function step(n, text) { return createNumberedStep(n, text, VERSION); }

/** Shorthand for spec table */
function specTable(headers, rows, accent) {
  return createSpecTable(headers, rows, VERSION, accent);
}

/** Shorthand for safety panel */
function safety(level, msg) { return createSafetyPanel(level, msg, VERSION); }

/** Shorthand for callout */
function callout(type, msg) { return createCalloutBox(type, msg, VERSION); }

/** Shorthand for image placeholder */
function img(desc) { return createImagePlaceholder(desc, VERSION); }

/** Bold-lead paragraph: "**Lead** \u2014 rest of text" */
function boldLead(lead, rest) {
  const sizes = FONT_SIZES.versionA;
  const spacing = SPACING.versionA;
  return new Paragraph({
    spacing: { after: spacing.bodyAfter },
    children: [
      new TextRun({ text: lead, bold: true, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal }),
      new TextRun({ text: ` \u2014 ${rest}`, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal })
    ]
  });
}

/** Paragraph with bold prefix and normal continuation */
function boldPrefix(prefix, rest) {
  const sizes = FONT_SIZES.versionA;
  const spacing = SPACING.versionA;
  return new Paragraph({
    spacing: { after: spacing.bodyAfter },
    children: [
      new TextRun({ text: prefix, bold: true, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal }),
      new TextRun({ text: rest, size: sizes.body, font: 'Source Sans Pro', color: COLORS.charcoal })
    ]
  });
}

// ---------------------------------------------------------------------------
// Build Content
// ---------------------------------------------------------------------------

function buildContent() {
  const c = [];

  // =======================================================================
  // Cover page hero image
  // =======================================================================
  c.push(img('Seiko Presage hero shot \u2014 a Presage Sharp Edged SPB167 (Aitetsu blue dial with Asanoha hemp-leaf pattern) resting at a slight angle on a dark slate surface, showing the angular faceted case with Zaratsu mirror-polished sides catching light. The blue dial displays the intricate geometric hemp-leaf texture with applied silver indices and dauphine hands. The sapphire exhibition caseback is partially visible reflecting the decorated automatic movement. Soft directional lighting from upper-left creates dramatic shadows on the sharp case edges. A blurred Japanese garden element (bamboo or stone) in the background'));

  c.push(createSpacer(100));

  // Title block info table
  c.push(specTable(
    ['', ''],
    [
      ['Collection', 'Seiko Presage'],
      ['Document', 'WC-SKP-PM-v1.0'],
      ['Revision', '1.0'],
      ['Date', '2026-04-12']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // 1. Product Overview
  // =======================================================================
  c.push(h1('1. Product Overview'));

  c.push(h2('1.1 Description'));
  c.push(body('The Seiko Presage is a collection of automatic mechanical watches that embodies the intersection of Japanese aesthetic sensitivity, centuries-old artisan craftsmanship, and Seiko\u2019s proprietary movement technology. Launched internationally in 2016, the Presage line draws inspiration from the 1913 Seiko Laurel \u2014 Japan\u2019s first wristwatch \u2014 and positions itself as the bridge between the entry-level Seiko 5 and the premium Grand Seiko.'));
  c.push(body('Every Presage watch is powered by a self-winding mechanical movement featuring Seiko\u2019s TRIMATIC technology: Diashock impact protection, the Magic Lever efficient winding system, and SPRON proprietary alloys for mainsprings and hairsprings. These movements convert the natural motion of the wearer\u2019s wrist into stored mechanical energy, requiring no battery or external power source.'));
  c.push(body('The collection is distinguished by its dial artistry, ranging from machine-pressed textures inspired by Japanese patterns (Asanoha hemp leaf, Karesansui garden raking) to handcrafted dials using centuries-old techniques \u2014 Urushi lacquer, Arita porcelain, and vitreous enamel applied by named master craftsmen. Case finishing includes Zaratsu polishing \u2014 a distortion-free mirror technique shared with Grand Seiko \u2014 and DiaShield super-hard coating for scratch resistance.'));

  c.push(h2('1.2 Key Features'));
  c.push(boldLead('Automatic Mechanical Movement', 'Self-winding via Seiko\u2019s Magic Lever; no battery required; 41\u201372 hour power reserve depending on caliber'));
  c.push(boldLead('Japanese Artisan Dials', 'Machine-pressed textures and handcrafted Urushi lacquer, Arita porcelain, and enamel dials by master craftsmen'));
  c.push(boldLead('Zaratsu Polishing', 'Distortion-free mirror finish on case surfaces, a hallmark technique shared with Grand Seiko'));
  c.push(boldLead('DiaShield Coating', 'Super-hard surface treatment (~500 HV) for scratch resistance on Sharp Edged and select models'));
  c.push(boldLead('Sapphire Crystal', 'Scratch-resistant sapphire with inner anti-reflective coating on premium sub-collections'));
  c.push(boldLead('Exhibition Caseback', 'See-through caseback revealing the decorated automatic movement'));
  c.push(boldLead('Hacking Seconds', 'Seconds hand stops when crown is pulled for precise time setting'));
  c.push(boldLead('GMT / Dual Time', 'Available across multiple sub-collections for tracking two time zones'));
  c.push(boldLead('LumiBrite', 'Seiko\u2019s proprietary non-radioactive luminous paint on select models'));

  c.push(h2('1.3 Sub-Collections'));
  c.push(specTable(
    ['Sub-Collection', 'Inspiration', 'Case Size', 'Movement', 'Crystal', 'Water Resistance', 'Price Range'],
    [
      ['Cocktail Time', 'Japanese cocktail culture', '38.5\u201340.5 mm', '4R35, 4R34, 4R38', 'Hardlex', '50 m', '$420\u2013$670'],
      ['Style60s', '1964 Crown Chronograph', '39.5\u201340.8 mm', '4R35, 4R34, 4R39', 'Hardlex', '50 m', '$500\u2013$670'],
      ['Sharp Edged', 'Angular Japanese simplicity', '39.3\u201342.2 mm', '6R35, 6R5J, 6R64', 'Sapphire', '100 m', '$814\u2013$1,614'],
      ['Classic Series', 'Japanese silk textiles', '36.0\u201340.2 mm', '6R51, 6R55, 6R5J', 'Sapphire', '50\u2013100 m', '$950\u2013$1,400'],
      ['Craftsmanship', 'Artisan dial techniques', '39.0\u201340.2 mm', '6R35, 6R54', 'Sapphire', '100 m', '$794\u2013$2,134'],
      ['Japanese Garden', 'Karesansui Zen garden', '41.7\u201341.8 mm', '4R35, 4R3P', 'Sapphire/Hardlex', '30\u201350 m', '~$595']
    ]
  ));

  c.push(h2('1.4 Package Contents'));
  c.push(specTable(
    ['Item', 'Quantity', 'Description'],
    [
      ['Seiko Presage Watch', '1', 'Automatic mechanical timepiece with bracelet or strap'],
      ['Instruction Manual', '1', 'Multi-language operation and care guide'],
      ['Warranty Card', '1', 'International warranty certificate'],
      ['Presentation Box', '1', 'Branded display and storage box'],
      ['Hang Tags', '1 set', 'Model reference and feature tags']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // 2. System Architecture
  // =======================================================================
  c.push(h1('2. System Architecture'));

  c.push(h2('2.1 Mechanical Movement Overview'));
  c.push(img('Exploded view technical illustration of a Seiko Presage automatic movement (Caliber 6R35) showing all major components separated vertically \u2014 from top to bottom: crystal, dial with hands, movement plate with train wheels visible, automatic winding module with rotor (Magic Lever mechanism highlighted), mainspring barrel, balance wheel with hairspring, and caseback. Each component labeled with leader lines. Clean white background, technical illustration style with subtle shadows showing depth. Cross-section detail inset showing the Magic Lever mechanism with pull and push pullets'));

  c.push(body('The Seiko Presage automatic movement converts wrist motion into stored mechanical energy through a self-winding mechanism:'));

  c.push(step(1, 'Energy Capture \u2014 The oscillating rotor (visible through the caseback) swings with wrist movement'));
  c.push(step(2, 'Magic Lever Winding \u2014 Seiko\u2019s patented Magic Lever converts bidirectional rotor motion into unidirectional mainspring winding using two spring pullets'));
  c.push(step(3, 'Energy Storage \u2014 The mainspring (SPRON 510 alloy) stores energy in the barrel, providing 41\u201372 hours of power reserve'));
  c.push(step(4, 'Regulation \u2014 The balance wheel oscillates at 21,600 or 28,800 beats per hour, regulated by the SPRON hairspring'));
  c.push(step(5, 'Timekeeping \u2014 The gear train transmits regulated energy to the hour, minute, and second hands'));
  c.push(step(6, 'Protection \u2014 Diashock system absorbs impacts to protect the delicate balance wheel pivots'));

  c.push(h2('2.2 TRIMATIC Technology'));
  c.push(body('Seiko\u2019s proprietary TRIMATIC system comprises three core technologies used across all Presage movements:'));
  c.push(specTable(
    ['Technology', 'Function', 'Benefit'],
    [
      ['Diashock', 'Shock-resistance structure protecting balance wheel pivots', 'Impact protection from drops and knocks'],
      ['Magic Lever', 'Patented bidirectional automatic winding mechanism (1959)', 'Efficient energy capture from natural wrist movement; fewer parts than Swiss equivalents'],
      ['SPRON', 'Proprietary alloy for mainspring (Spron 510) and hairspring', 'Resistance to tearing, corrosion, and wear; long-term accuracy']
    ]
  ));

  c.push(h2('2.3 Crown Positions'));
  c.push(specTable(
    ['Position', 'Action', 'Operation'],
    [
      ['Position 0 (pushed in)', 'Manual winding', 'Rotate crown clockwise'],
      ['Position 1 (first click out)', 'Date adjustment', 'Rotate counterclockwise'],
      ['Position 2 (second click out)', 'Time setting', 'Rotate in either direction; seconds hand stops (hacking)']
    ]
  ));

  c.push(safety('notice', 'Crown positions may vary slightly between caliber families. Refer to the caliber-specific instruction sheet included with each watch.'));

  c.push(pageBreak());

  // =======================================================================
  // 3. Technical Specifications
  // =======================================================================
  c.push(h1('3. Technical Specifications'));

  c.push(h2('3.1 Movement Specifications'));

  c.push(h3('3.1.1 4R Family (Entry / Mid-Range)'));
  c.push(specTable(
    ['Parameter', '4R35', '4R34 (GMT)', '4R38 (Open Heart)', '4R39 (Open Heart)'],
    [
      ['Type', 'Automatic', 'Automatic', 'Automatic', 'Automatic'],
      ['Jewels', '23\u201324', '24', '[TBD]', '[TBD]'],
      ['Frequency', '21,600 bph (3 Hz)', '21,600 bph (3 Hz)', '21,600 bph (3 Hz)', '21,600 bph (3 Hz)'],
      ['Power Reserve', '41 h', '41 h', '41 h', '41 h'],
      ['Accuracy', '-35/+45 s/day', '-35/+45 s/day', '-35/+45 s/day', '-35/+45 s/day'],
      ['Hacking', 'Yes', 'Yes', 'Yes', 'Yes'],
      ['Hand-Winding', 'Yes', 'Yes', 'Yes', 'Yes'],
      ['Diameter', '27.4 mm', '[TBD]', '[TBD]', '[TBD]'],
      ['Thickness', '5.32 mm', '[TBD]', '[TBD]', '[TBD]'],
      ['GMT Function', 'No', 'Yes', 'No', 'No'],
      ['Open Heart', 'No', 'No', 'Yes', 'Yes']
    ]
  ));

  c.push(h3('3.1.2 6R Family (Premium)'));
  c.push(specTable(
    ['Parameter', '6R35', '6R51', '6R55', '6R5J', '6R54 (GMT)', '6R64 (GMT)', '6R27'],
    [
      ['Jewels', '24', '24', '24', '24', '24', '29', '29'],
      ['Frequency', '21,600', '21,600', '21,600', '21,600', '21,600', '28,800', '28,800'],
      ['Power Reserve', '70 h', '72 h', '72 h', '72 h', '72 h', '45 h', '45 h'],
      ['Accuracy', '-15/+25', '-15/+25', '-15/+25', '-15/+25', '-15/+25', '-15/+25', '-15/+25'],
      ['Mag. Resistance', '4,800 A/m', '\u2014', '4,800 A/m', '\u2014', '\u2014', '\u2014', '\u2014'],
      ['Diameter', '27.4 mm', '[TBD]', '[TBD]', '[TBD]', '[TBD]', '[TBD]', '27.4 mm'],
      ['Thickness', '5.25 mm', '[TBD]', '[TBD]', '[TBD]', '[TBD]', '[TBD]', '5.32 mm'],
      ['GMT', 'No', 'No', 'No', 'No', 'Yes', 'Yes', 'No'],
      ['Power Reserve Ind.', 'No', 'No', 'No', 'No', 'No', 'Yes', 'Yes'],
      ['Open Heart', 'No', 'No', 'No', 'Yes', 'No', 'No', 'No']
    ]
  ));

  c.push(h2('3.2 Case Dimensions'));
  c.push(specTable(
    ['Sub-Collection', 'Diameter', 'Thickness', 'Lug-to-Lug', 'Weight', 'Lug Width'],
    [
      ['Cocktail Time (SRPB)', '40.5 mm', '12.0 mm', '47.0 mm', '[TBD]', '20 mm'],
      ['Cocktail Time (SRPE)', '38.5 mm', '11.8 mm', '45.4 mm', '63 g', '20 mm'],
      ['Cocktail Time GMT', '40.5 mm', '12.8 mm', '47.5 mm', '[TBD]', '20 mm'],
      ['Style60s (2025)', '39.5 mm', '12.0 mm', '46.2 mm', '[TBD]', '20 mm'],
      ['Style60s GMT', '40.8 mm', '~13.0 mm', '48.9 mm', '[TBD]', '[TBD]'],
      ['Sharp Edged', '39.3 mm', '11.1 mm', '47.2 mm', '[TBD]', '20 mm'],
      ['Sharp Edged GMT', '42.2 mm', '13.7 mm', '49.2 mm', '180 g', '[TBD]'],
      ['Classic (Date)', '40.2 mm', '[TBD]', '[TBD]', '[TBD]', '[TBD]'],
      ['Classic (3-Hand)', '36.0 mm', '[TBD]', '[TBD]', '[TBD]', '[TBD]'],
      ['Japanese Garden', '41.8 mm', '12.5 mm', '[TBD]', '[TBD]', '[TBD]'],
      ['Craftsmanship GMT', '40.2 mm', '12.4 mm', '~48.0 mm', '[TBD]', '[TBD]']
    ]
  ));

  c.push(h2('3.3 Materials'));
  c.push(specTable(
    ['Component', 'Specification'],
    [
      ['Case Material', '316L stainless steel (150\u2013200 HV); titanium on select models'],
      ['DiaShield Coating', 'Super-hard coating (~500 HV, ~2.5\u00D7 harder than 316L steel)'],
      ['Crystal (Entry)', 'Hardlex (Seiko proprietary hardened mineral crystal), domed'],
      ['Crystal (Premium)', 'Sapphire with inner anti-reflective coating; dual-curved on Classic Series'],
      ['Caseback', 'See-through exhibition (sapphire or mineral crystal, screw-down)'],
      ['Bracelet', '316L stainless steel; three-fold clasp with push-button release'],
      ['Strap', 'Calfskin leather, alligator-embossed, or crocodile (Craftsmanship)'],
      ['Luminescence', 'LumiBrite (non-radioactive fluorescent paint) on select models'],
      ['Mainspring', 'SPRON 510 alloy']
    ]
  ));

  c.push(h2('3.4 Water Resistance'));
  c.push(specTable(
    ['Rating', 'Meaning', 'Sub-Collections'],
    [
      ['30 m (3 bar)', 'Splash-resistant; not suitable for swimming', 'Select Japanese Garden models'],
      ['50 m (5 bar)', 'Suitable for brief water exposure; not for swimming or diving', 'Cocktail Time, Style60s, most Classic'],
      ['100 m (10 bar)', 'Suitable for swimming and water sports; not for scuba diving', 'Sharp Edged, Craftsmanship, select Classic']
    ]
  ));

  c.push(safety('caution', 'WATER DAMAGE RISK \u2014 Do not operate the crown when the watch is wet or submerged. Water resistance degrades over time as gaskets age. Have water resistance professionally tested annually if you frequently expose the watch to water.'));

  c.push(h2('3.5 Environmental Specifications'));
  c.push(specTable(
    ['Parameter', 'Min', 'Max', 'Unit'],
    [
      ['Operating Temperature', '5', '35', '\u00B0C'],
      ['Accuracy Temperature Range', '5', '35', '\u00B0C']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // 4. Components
  // =======================================================================
  c.push(h1('4. Components'));

  c.push(h2('4.1 Dial Artistry'));
  c.push(body('The Presage collection is defined by its exceptional dial craftsmanship, spanning machine-pressed textures to handcrafted artisan techniques.'));

  c.push(h3('4.1.1 Machine-Pressed Techniques'));
  c.push(img('Close-up macro photograph showing four dial textures side by side \u2014 LEFT: Asanoha (hemp leaf) geometric pattern from Sharp Edged series in deep indigo blue catching light at different angles, CENTER-LEFT: Karesansui (Zen garden) raked gravel circular pattern from Japanese Garden series in warm gold, CENTER-RIGHT: Cocktail Time sunray texture in ice blue with iridescent shimmer, RIGHT: Classic Series silk-inspired texture in warm tea brown. Each dial section approximately 25% of frame width. Extreme macro showing texture depth and light play. Dark background'));

  c.push(specTable(
    ['Technique', 'Pattern', 'Sub-Collection', 'Origin'],
    [
      ['Asanoha', 'Hemp leaf geometric', 'Sharp Edged', 'Heian period (1,000+ years)'],
      ['Karesansui', 'Raked gravel / wave', 'Japanese Garden', 'Zen garden tradition'],
      ['Sunray / Iridescent', 'Radiating lines', 'Cocktail Time', 'Modern technique'],
      ['Silk-inspired', 'Woven textile texture', 'Classic Series', 'Japanese textile tradition']
    ]
  ));

  c.push(h3('4.1.2 Artisan Techniques (Craftsmanship Series)'));
  c.push(specTable(
    ['Technique', 'Master Craftsman', 'Heritage', 'Characteristics'],
    [
      ['Urushi Lacquer', 'Isshu Tamura', 'Edo period (1603\u20131868)', 'Hand-applied natural lacquer; deep luminous surface; each dial unique'],
      ['Arita Porcelain', 'Hiroyuki Hashiguchi', 'Since 1830', 'Fired porcelain; pure white (glazed) or warm matte (unglazed); extremely delicate'],
      ['Enamel', 'Mitsuru Yokosawa', 'Traditional vitreous enamel', 'Flawless 0.1 mm coat; depth and brilliance impossible with paint'],
      ['Shippo Enamel', 'Wataru Totani', 'Multi-step glazing/firing', 'Distinctive wave pattern visible after polishing']
    ]
  ));

  c.push(h2('4.2 Case Construction'));

  c.push(h3('4.2.1 Zaratsu Polishing'));
  c.push(img('Split-view comparison photograph \u2014 LEFT side showing the raw brushed stainless steel surface of a watch case before Zaratsu polishing (visible machining marks, dull reflection), RIGHT side showing the same case after Zaratsu polishing (perfect mirror-flat surface reflecting a clean image without any distortion, like a liquid mirror). A thin dividing line separates the two halves. The polished side should show a near-perfect reflection of the photographer\u2019s hand or a small object. Studio macro lighting'));

  c.push(body('Zaratsu polishing is a distortion-free mirror finishing technique shared with Grand Seiko. The case surface is pressed against a rotating tin plate to achieve a perfectly flat, optically clear mirror finish \u2014 surfaces reflect without any warping or optical distortion.'));

  c.push(h3('4.2.2 DiaShield Super-Hard Coating'));
  c.push(specTable(
    ['Property', 'Value'],
    [
      ['Process', 'Ionized metals combined with nitrogen, carbon, and oxygen ions in vacuum'],
      ['Hardness', '~500 HV (Vickers scale)'],
      ['Comparison', '~2.5\u00D7 harder than standard 316L stainless steel (150\u2013200 HV)'],
      ['Purpose', 'Scratch resistance \u2014 preserves case beauty during daily wear'],
      ['Applied to', 'Sharp Edged series, select premium models']
    ]
  ));

  c.push(safety('notice', 'DiaShield is a surface coating. If scratched through to the base metal, the coating cannot be polished back. Handle with care around hard surfaces.'));

  c.push(h2('4.3 Crystal Types'));
  c.push(specTable(
    ['Type', 'Sub-Collections', 'Properties'],
    [
      ['Hardlex', 'Cocktail Time, Style60s', 'Seiko\u2019s proprietary hardened mineral crystal; more scratch-resistant than standard mineral; less than sapphire'],
      ['Sapphire', 'Sharp Edged, Classic, Craftsmanship', 'Mohs hardness 9 (second only to diamond); inner anti-reflective coating reduces glare'],
      ['Dual-Curved Sapphire', 'Classic Series', 'Curved on both surfaces for a refined, flowing profile matching the soft case design']
    ]
  ));

  c.push(h2('4.4 Exhibition Caseback'));
  c.push(body('All Presage models feature a see-through caseback revealing the decorated automatic movement:'));
  c.push(bullet('Sapphire crystal caseback on premium models (Sharp Edged, Classic, Craftsmanship)'));
  c.push(bullet('Mineral crystal caseback on entry models (Cocktail Time, Style60s)'));
  c.push(bullet('Screw-down construction for water resistance'));
  c.push(bullet('Engraved model reference and serial number on case ring'));

  c.push(pageBreak());

  // =======================================================================
  // 5. Operation
  // =======================================================================
  c.push(h1('5. Operation'));

  c.push(h2('5.1 Starting the Watch'));
  c.push(body('If the watch has stopped (power reserve depleted):'));

  c.push(step(1, 'Remove the watch from storage.'));
  c.push(step(2, 'Hold the watch face-up in one hand.'));
  c.push(step(3, 'Rotate the crown clockwise (Position 0 \u2014 pushed in) approximately 20\u201330 turns. For 6R35 and 6R5x calibers: 55+ turns for a full mainspring wind.'));
  c.push(step(4, 'Place the watch on your wrist. The rotor will maintain the charge through your natural wrist movement.'));

  c.push(callout('tip', 'If you do not wear the watch daily, consider storing it on a watch winder to maintain the power reserve and keep the date current. Alternatively, manually wind the crown 20\u201330 turns before wearing.'));

  c.push(h2('5.2 Setting the Time'));
  c.push(step(1, 'Pull the crown to Position 2 (second click out). The seconds hand stops (hacking function).'));
  c.push(step(2, 'Wait for a time reference (phone, radio, TV) to reach the desired second.'));
  c.push(step(3, 'Rotate the crown in either direction to set the correct time.'));
  c.push(step(4, 'Push the crown back to Position 0 when the reference reaches the target second.'));

  c.push(h2('5.3 Setting the Date'));

  c.push(safety('caution', 'DATE MECHANISM RISK \u2014 Do not adjust the date between 9:00 PM and 2:00 AM. During this period, the date-change mechanism is engaged and forcing the crown can damage the movement gears.'));

  c.push(step(1, 'Pull the crown to Position 1 (first click out).'));
  c.push(step(2, 'Rotate the crown counterclockwise to advance the date.'));
  c.push(step(3, 'Push the crown back to Position 0 when the correct date is displayed.'));

  c.push(h2('5.4 GMT Function (GMT Models Only)'));
  c.push(body('GMT-equipped models (Caliber 4R34, 6R54, 6R64) feature an independent 24-hour hand for tracking a second time zone:'));

  c.push(step(1, 'Pull the crown to the GMT setting position (varies by caliber \u2014 consult specific instruction sheet).'));
  c.push(step(2, 'Rotate the crown to move the 24-hour GMT hand independently.'));
  c.push(step(3, 'Set the GMT hand to the desired second time zone using the 24-hour scale on the dial or bezel.'));
  c.push(step(4, 'Push the crown back to Position 0.'));

  c.push(safety('notice', 'The GMT function is a "caller/office" type \u2014 the 24-hour hand is independently adjustable while the local time hands continue running. This allows you to track a home time zone while travelling.'));

  c.push(h2('5.5 Power Reserve'));
  c.push(specTable(
    ['Caliber Family', 'Power Reserve', 'Wearing Recommendation'],
    [
      ['4R series', '~41 hours', 'Wear daily or wind every 2 days'],
      ['6R35', '~70 hours', 'Wear daily or wind every 3 days'],
      ['6R51/6R55/6R5J', '~72 hours', 'Wear daily or wind every 3 days'],
      ['6R27/6R64', '~45 hours', 'Wear daily or wind every 2 days']
    ]
  ));

  c.push(callout('tip', 'Models with the 6R-series 70\u201372 hour power reserve can maintain timekeeping through a full weekend off the wrist without manual winding.'));

  c.push(pageBreak());

  // =======================================================================
  // 6. Maintenance
  // =======================================================================
  c.push(h1('6. Maintenance'));

  c.push(h2('6.1 Maintenance Schedule'));
  c.push(specTable(
    ['Task', 'Frequency', 'Procedure'],
    [
      ['Wipe case and bracelet', 'Weekly', 'Clean with a soft, dry cloth to remove moisture and perspiration'],
      ['Rinse after saltwater', 'After each exposure', 'Rinse thoroughly with fresh water; dry completely'],
      ['Check bracelet clasp', 'Monthly', 'Verify push-button release functions correctly'],
      ['Water resistance test', 'Annually', 'Professional test at authorized Seiko service center'],
      ['Full movement overhaul', 'Every 3\u20135 years', 'Complete disassembly, cleaning, lubrication, adjustment, gasket replacement']
    ]
  ));

  c.push(h2('6.2 Calibration (Accuracy)'));

  c.push(h3('6.2.1 Expected Accuracy'));
  c.push(specTable(
    ['Caliber Family', 'Daily Accuracy', 'Notes'],
    [
      ['4R series', '-35/+45 seconds per day', 'Entry-level; measured at 5\u201335 \u00B0C'],
      ['6R series', '-15/+25 seconds per day', 'Premium; measured at 5\u201335 \u00B0C']
    ]
  ));

  c.push(safety('notice', 'Real-world accuracy depends on wearing habits, wrist position during sleep, ambient temperature, and magnetic field exposure. If accuracy consistently exceeds the rated range, have the watch inspected at an authorized Seiko service center.'));

  c.push(h3('6.2.2 Factors Affecting Accuracy'));
  c.push(specTable(
    ['Factor', 'Effect', 'Mitigation'],
    [
      ['Temperature extremes', 'Rate changes outside 5\u201335 \u00B0C range', 'Avoid prolonged exposure to extreme heat or cold'],
      ['Magnetism', 'Hairspring magnetization causes rate gain', 'Keep away from speakers, phones, laptop speakers, magnetic clasps (see Section 6.3)'],
      ['Shock / impact', 'Balance wheel pivots can shift', 'Avoid drops and impacts; Diashock provides basic protection'],
      ['Position', 'Rate varies between dial-up, crown-up, etc.', 'Normal; average across wearing positions'],
      ['Low power reserve', 'Rate decreases as mainspring unwinds', 'Wear daily or wind regularly']
    ]
  ));

  c.push(h2('6.3 Magnetism Avoidance'));

  c.push(safety('caution', 'MAGNETISM RISK \u2014 Strong magnetic fields can magnetize the hairspring, causing the watch to gain several minutes per day. The 6R-series movements have magnetic resistance of 4,800 A/m (60 gauss), but stronger fields can still affect accuracy.'));

  c.push(boldPrefix('Keep the watch at least 5 cm away from:', ''));
  c.push(bullet('Mobile phone speakers'));
  c.push(bullet('Laptop speakers and keyboards (magnets in lid closure)'));
  c.push(bullet('Tablet covers with magnetic clasps'));
  c.push(bullet('Refrigerator magnets'));
  c.push(bullet('Audio speakers'));
  c.push(bullet('Magnetic jewelry clasps'));
  c.push(bullet('Induction cooktops'));

  c.push(boldPrefix('If magnetized: ', 'Have the watch demagnetized at an authorized Seiko service center. This is a quick, non-invasive procedure.'));

  c.push(h2('6.4 Overhaul Service'));
  c.push(body('A full movement overhaul should be performed every 3\u20135 years (every 2\u20133 years for 6R35 caliber):'));

  c.push(boldPrefix('What the overhaul includes:', ''));
  c.push(bullet('Complete movement disassembly'));
  c.push(bullet('Ultrasonic cleaning of all components'));
  c.push(bullet('Replacement of worn parts'));
  c.push(bullet('Re-lubrication with fresh oils and greases'));
  c.push(bullet('Timing adjustment and regulation'));
  c.push(bullet('Gasket replacement (crown, caseback, crystal)'));
  c.push(bullet('Water resistance testing'));
  c.push(bullet('Final accuracy testing across multiple positions'));

  c.push(boldPrefix('Estimated cost: ', '~$260 USD through authorized Seiko service.'));

  c.push(pageBreak());

  // =======================================================================
  // 7. Troubleshooting
  // =======================================================================
  c.push(h1('7. Troubleshooting'));

  c.push(h2('7.1 Common Issues'));
  c.push(specTable(
    ['Symptom', 'Likely Cause', 'Quick Checks', 'Fix', 'Escalate When'],
    [
      ['Watch has stopped', 'Power reserve depleted', 'Check if crown is in Position 0', 'Wind crown clockwise 20\u201330 turns; wear on wrist', 'Watch stops again within 24 hours of full wind'],
      ['Gaining several minutes/day', 'Magnetized hairspring', 'Place near compass \u2014 if needle deflects, watch is magnetized', 'Have demagnetized at service center', 'Gaining persists after demagnetization'],
      ['Losing more than rated accuracy', 'Low power reserve or worn movement', 'Wind fully; wear for 24 hours; measure deviation', 'Wind daily; if still inaccurate, service needed', 'Deviation exceeds rated range consistently'],
      ['Date not changing', 'Crown in wrong position; or adjusting during 9PM\u20132AM', 'Verify crown is in Position 1 for date', 'Advance time past midnight to trigger date change', 'Date mechanism jams \u2014 requires service'],
      ['Rotor not spinning', 'Winding mechanism issue', 'Hold watch and tilt \u2014 rotor should swing freely', 'Visible through caseback', 'Rotor stuck or not spinning freely'],
      ['Condensation under crystal', 'Gasket failure; water ingress', 'Check crown is pushed in fully', 'Bring to service center immediately \u2014 moisture damages movement', 'Any visible condensation'],
      ['Crown difficult to pull out', 'Normal resistance / debris', 'Ensure screw-down crown is fully unscrewed first (if applicable)', 'Gently pull with dry fingers', 'Crown does not pull out at all'],
      ['Bracelet clasp not closing', 'Clasp mechanism worn', 'Inspect clasp for visible damage or debris', 'Clean clasp area; apply gentle pressure', 'Clasp does not lock securely']
    ]
  ));

  c.push(h2('7.2 When to Contact Service'));
  c.push(body('Contact an authorized Seiko service center when:'));
  c.push(bullet('Watch consistently loses or gains time beyond the rated accuracy range'));
  c.push(bullet('Date mechanism does not advance at midnight'));
  c.push(bullet('Crown feels loose, grinds, or does not return to Position 0'));
  c.push(bullet('Water or condensation is visible under the crystal'));
  c.push(bullet('Crystal is cracked or chipped'));
  c.push(bullet('Rotor sound changes (grinding, scraping instead of smooth whirring)'));
  c.push(bullet('DiaShield coating shows deep scratches to base metal'));
  c.push(bullet('Bracelet links or clasp mechanism fails'));

  c.push(pageBreak());

  // =======================================================================
  // 8. Safety Information
  // =======================================================================
  c.push(h1('8. Safety Information'));

  c.push(h2('8.1 General Precautions'));

  c.push(safety('caution', 'SKIN IRRITATION \u2014 Prolonged contact with moisture, perspiration, or dirt trapped between the watch and skin can cause irritation. Clean the caseback and bracelet regularly. Remove the watch if irritation occurs and consult a physician if symptoms persist.'));

  c.push(bullet('Do not expose the watch to temperatures outside 5\u201335 \u00B0C for extended periods'));
  c.push(bullet('Avoid strong shocks and impacts (drops from height, striking hard surfaces)'));
  c.push(bullet('Remove the watch before vigorous sports activities that may cause impacts'));
  c.push(bullet('Do not place the watch near strong magnets or electronic devices with magnets'));

  c.push(h2('8.2 Water Resistance Precautions'));

  c.push(safety('caution', 'WATER DAMAGE \u2014 Water resistance is not permanent. Gaskets deteriorate over time with exposure to perspiration, cosmetics, and temperature changes. Have water resistance tested annually at an authorized service center.'));

  c.push(bullet('Never operate the crown when the watch is wet or submerged'));
  c.push(bullet('Never press pushers underwater (if equipped)'));
  c.push(bullet('Rinse with fresh water after saltwater or chlorinated water exposure'));
  c.push(bullet('Avoid hot water (showers, hot tubs, saunas) \u2014 thermal expansion can compromise seals'));
  c.push(bullet('50 m (5 bar) rating: Splash-resistant only \u2014 not suitable for swimming'));
  c.push(bullet('100 m (10 bar) rating: Suitable for swimming and water sports \u2014 not for scuba diving'));

  c.push(h2('8.3 Chemical Exposure'));
  c.push(bullet('Avoid contact with solvents, detergents, cosmetics, and perfumes \u2014 these can damage gaskets, coatings, and strap materials'));
  c.push(bullet('Remove the watch before applying hand sanitizer, sunscreen, or insect repellent'));
  c.push(bullet('Leather straps are particularly vulnerable to moisture and chemicals \u2014 keep dry'));

  c.push(pageBreak());

  // =======================================================================
  // Appendix A: Glossary
  // =======================================================================
  c.push(h1('Appendix A: Glossary'));
  c.push(specTable(
    ['Term', 'Definition'],
    [
      ['Asanoha', 'Hemp leaf geometric pattern; Heian period (1,000+ years old); used on Sharp Edged dials'],
      ['Automatic', 'Self-winding mechanical movement powered by wrist motion via oscillating rotor'],
      ['Balance Wheel', 'Oscillating component that regulates timekeeping accuracy (21,600 or 28,800 bph)'],
      ['bph', 'Beats per hour \u2014 frequency of the balance wheel oscillation'],
      ['Caliber', 'Technical designation for a specific movement design (e.g., 6R35, 4R35)'],
      ['Complication', 'Any function beyond basic hours, minutes, and seconds (e.g., date, GMT, power reserve)'],
      ['DiaShield', 'Seiko\u2019s super-hard surface coating (~500 HV) for scratch resistance'],
      ['Diashock', 'Seiko\u2019s shock-protection system for the balance wheel pivots'],
      ['GMT', 'Greenwich Mean Time function \u2014 tracks a second time zone via a 24-hour hand'],
      ['Hacking', 'Feature that stops the seconds hand when crown is pulled for precise time setting'],
      ['Hardlex', 'Seiko\u2019s proprietary hardened mineral crystal; more scratch-resistant than standard mineral'],
      ['Karesansui', 'Japanese Zen dry garden; raked gravel patterns; used on Japanese Garden dials'],
      ['LumiBrite', 'Seiko\u2019s non-radioactive fluorescent luminous paint for hands and indices'],
      ['Magic Lever', 'Seiko\u2019s patented efficient automatic winding mechanism (invented 1959)'],
      ['Open Heart', 'Dial aperture revealing the balance wheel in motion'],
      ['Power Reserve', 'Duration a fully wound movement runs before stopping (41\u201372 hours for Presage)'],
      ['SPRON', 'Seiko\u2019s proprietary alloy for mainsprings (Spron 510) and hairsprings'],
      ['TRIMATIC', 'Seiko\u2019s three-technology system: Diashock + Magic Lever + SPRON'],
      ['Urushi', 'Traditional Japanese lacquer technique; applied by hand; Edo period heritage'],
      ['Zaratsu', 'Distortion-free mirror polishing technique shared with Grand Seiko']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // Appendix B: Model Quick Reference
  // =======================================================================
  c.push(h1('Appendix B: Model Quick Reference'));
  c.push(specTable(
    ['Model', 'Sub-Collection', 'Dial Color', 'Movement', 'Case Size', 'Key Feature'],
    [
      ['SPB167', 'Sharp Edged', 'Aitetsu blue', '6R35', '39.3 mm', 'Asanoha pattern, 70h PR'],
      ['SPB165', 'Sharp Edged', 'Shironeri white', '6R35', '39.3 mm', 'Asanoha pattern, 70h PR'],
      ['SPB217', 'Sharp Edged GMT', 'Blue', '6R64', '42.2 mm', 'GMT + power reserve'],
      ['SRPB41', 'Cocktail Time', 'Blue Moon', '4R35', '40.5 mm', 'Iconic cocktail dial'],
      ['SRPE43', 'Cocktail Time', 'Blue', '4R35', '38.5 mm', 'Compact 38.5 mm'],
      ['SSK037', 'Cocktail Time GMT', 'Blue', '4R34', '40.5 mm', 'Affordable GMT'],
      ['SSK009', 'Style60s GMT', 'Blue grey', '4R34', '40.8 mm', 'Retro 1960s design'],
      ['SPB463', 'Classic', 'Date', '6R55', '40.2 mm', '72h power reserve'],
      ['SPB521', 'Classic', '3-Hand', '6R51', '36.0 mm', 'No date, pure dress'],
      ['SPB469', 'Classic', 'Semi-skeleton', '6R5J', '40.2 mm', 'Open balance wheel'],
      ['SPB447', 'Craftsmanship GMT', 'Urushi lacquer', '6R54', '40.2 mm', 'Artisan dial + GMT'],
      ['SPB495', 'Craftsmanship', 'Enamel', '[TBD]', '[TBD]', 'Enamel dial'],
      ['SSA463', 'Japanese Garden', 'Green', '4R35', '41.8 mm', 'Zen garden texture']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // Appendix C: Version History
  // =======================================================================
  c.push(h1('Appendix C: Version History'));
  c.push(specTable(
    ['Version', 'Date', 'Changes'],
    [
      ['1.0', '2026-04-12', 'Initial release']
    ]
  ));

  c.push(pageBreak());

  // =======================================================================
  // Appendix D: Contact Information
  // =======================================================================
  c.push(h1('Appendix D: Contact Information'));
  c.push(specTable(
    ['', ''],
    [
      ['Brand', 'Seiko Watch Corporation'],
      ['Collection', 'Presage'],
      ['Global Website', 'seikowatches.com'],
      ['Service Locator', 'seikowatches.com/support'],
      ['Integrated By', 'WakeCap Technologies'],
      ['WakeCap Portal', 'portal.wakecap.com']
    ]
  ));

  c.push(createSpacer(400));

  // Footer copyright
  const sizes = FONT_SIZES.versionA;
  c.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 600 },
    children: [
      new TextRun({
        text: '\u00A9 2026 WakeCap Technologies. All rights reserved.',
        italics: true,
        size: sizes.caption,
        font: 'Source Sans Pro',
        color: COLORS.slate
      })
    ]
  }));
  c.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      new TextRun({
        text: 'WC-SKP-PM-v1.0 \u2014 Revision Date: 2026-04-12',
        italics: true,
        size: sizes.caption,
        font: 'Source Sans Pro',
        color: COLORS.slate
      })
    ]
  }));

  return c;
}

// ---------------------------------------------------------------------------
// Main \u2014 build and save document
// ---------------------------------------------------------------------------

async function main() {
  console.log('Building WC-SKP-PM-v1.0.docx ...');

  const content = buildContent();

  const doc = buildDocument({
    docId: DOC_ID,
    productName: PRODUCT_NAME,
    docType: DOC_TYPE,
    version: VERSION,
    revisionDate: REVISION_DATE,
    subtitle: SUBTITLE,
    content,
    includeCoverPage: true,
    includeTOC: true,
    metadata: {
      title: 'Seiko Presage \u2014 Product Manual',
      subject: 'Japanese Mechanical Watchmaking Meets Artisan Craftsmanship',
      keywords: 'Seiko, Presage, Automatic, Mechanical Watch, Zaratsu, TRIMATIC, WakeCap, Product Manual',
      creator: 'WakeCap Technologies'
    }
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.resolve(__dirname, 'WC-SKP-PM-v1.0.docx');
  fs.writeFileSync(outputPath, buffer);

  const stats = fs.statSync(outputPath);
  const sizeKB = (stats.size / 1024).toFixed(1);
  console.log(`Generated: ${outputPath}`);
  console.log(`File size: ${sizeKB} KB (${stats.size} bytes)`);
}

main().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
