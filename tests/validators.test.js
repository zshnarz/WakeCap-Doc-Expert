const test = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const KB_VALIDATOR = path.join(ROOT, 'templates', 'kb-validator.js');
const FIXTURE_KB = path.join(ROOT, 'tests', 'fixtures', 'sample-kb.md');
const FIXTURE_INVALID = path.join(ROOT, 'tests', 'fixtures', 'invalid-kb.md');

test('kb-validator.js exits 0 on the sample-kb fixture', () => {
  const result = spawnSync(
    process.execPath,
    [KB_VALIDATOR, FIXTURE_KB],
    { encoding: 'utf-8', cwd: ROOT, timeout: 10_000 }
  );
  assert.strictEqual(result.status, 0, `validator output:\n${result.stdout}\n${result.stderr}`);
});

test('kb-validator.js exits 1 on a KB missing a required section', () => {
  const result = spawnSync(
    process.execPath,
    [KB_VALIDATOR, FIXTURE_INVALID],
    { encoding: 'utf-8', cwd: ROOT, timeout: 10_000 }
  );
  assert.strictEqual(result.status, 1, `expected exit 1, got ${result.status}\nstdout: ${result.stdout}`);
  assert.match(result.stdout, /Missing required section.*Glossary/i, 'expected error message about missing Glossary section');
});
