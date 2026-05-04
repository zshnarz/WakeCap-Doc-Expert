const test = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const FIXTURE = path.join(ROOT, 'tests', 'fixtures', 'sample-doc.md');
const FILTER = path.join(ROOT, 'pandoc', 'filters', 'wakecap.lua');

function pandocAvailable() {
  const r = spawnSync('pandoc', ['--version'], { encoding: 'utf-8' });
  return r.status === 0;
}

const SIGNAL_WORDS = ['DANGER', 'WARNING', 'CAUTION', 'NOTICE', 'NOTE', 'TIP', 'IMPORTANT'];

test('lua filter transforms every fenced-div class into RawBlock OpenXML', { skip: !pandocAvailable() && 'Pandoc not installed' }, () => {
  const result = spawnSync(
    'pandoc',
    [FIXTURE, '-t', 'json', '--lua-filter', FILTER],
    { encoding: 'utf-8', timeout: 30_000 }
  );
  assert.strictEqual(result.status, 0, `stderr: ${result.stderr}`);

  const ast = JSON.parse(result.stdout);

  // Walk the AST collecting all RawBlocks of format "openxml"
  const rawXml = [];
  function walk(node) {
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node && typeof node === 'object') {
      if (node.t === 'RawBlock' && Array.isArray(node.c) && node.c[0] === 'openxml') {
        rawXml.push(node.c[1]);
      }
      Object.values(node).forEach(walk);
    }
  }
  walk(ast.blocks || ast);

  const allXml = rawXml.join('\n');

  for (const word of SIGNAL_WORDS) {
    assert.ok(
      allXml.includes(`>${word}<`) || allXml.includes(word),
      `expected ${word} signal word in filter output`
    );
  }
});

test('lua filter wraps [TBD] markers in Strong', { skip: !pandocAvailable() && 'Pandoc not installed' }, () => {
  const result = spawnSync(
    'pandoc',
    [FIXTURE, '-t', 'json', '--lua-filter', FILTER],
    { encoding: 'utf-8', timeout: 30_000 }
  );
  assert.strictEqual(result.status, 0, `stderr: ${result.stderr}`);

  const ast = JSON.parse(result.stdout);

  // Look for a Strong element whose stringified content is "[TBD]"
  let found = false;
  function walk(node) {
    if (found) return;
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node && typeof node === 'object') {
      if (node.t === 'Strong' && Array.isArray(node.c)) {
        const text = node.c.map(c => c && c.t === 'Str' ? c.c : '').join('');
        if (text === '[TBD]') { found = true; return; }
      }
      Object.values(node).forEach(walk);
    }
  }
  walk(ast.blocks || ast);

  assert.ok(found, 'expected [TBD] to be wrapped in Strong by the filter');
});
