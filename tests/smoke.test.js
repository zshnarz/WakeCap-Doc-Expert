const test = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const FIXTURE = path.join(ROOT, 'tests', 'fixtures', 'sample-doc.md');
const GENERATE = path.join(ROOT, 'pandoc', 'generate.js');

test('generate.js --dry-run exits 0 and prints the planned output path', () => {
  const result = spawnSync(process.execPath, [GENERATE, FIXTURE, '--dry-run'], {
    encoding: 'utf-8',
    cwd: ROOT,
  });
  assert.strictEqual(result.status, 0, `stderr: ${result.stderr}`);
  assert.match(result.stdout, /\[dry-run\]/i, 'expected dry-run banner');
  assert.match(result.stdout, /WC-XX-XX-v0\.0\.docx/, 'expected planned output path mentioning doc-id');
});

const fs = require('node:fs');
const os = require('node:os');

function pandocAvailable() {
  const r = spawnSync('pandoc', ['--version'], { encoding: 'utf-8' });
  return r.status === 0;
}

test('generate.js produces a non-empty .docx when Pandoc is available', { skip: !pandocAvailable() && 'Pandoc not installed' }, () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'wc-smoke-'));
  const out = path.join(tmp, 'sample.docx');
  try {
    const result = spawnSync(
      process.execPath,
      [GENERATE, FIXTURE, '-o', out],
      { encoding: 'utf-8', cwd: ROOT, timeout: 30_000 }
    );
    assert.strictEqual(result.status, 0, `stderr: ${result.stderr}`);
    assert.ok(fs.existsSync(out), 'expected output .docx to exist');
    assert.ok(fs.statSync(out).size > 1024, 'expected output > 1 KB');
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
