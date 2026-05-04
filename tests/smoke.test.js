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
