import test from 'node:test';
import assert from 'node:assert/strict';
import { getInitials, getAvatarGradient } from '../src/lib/avatar.js';

test('UserAvatar initials generator suite', async (t) => {
  await t.test('handles multi-word names by taking first letter of first 2 words', () => {
    assert.equal(getInitials('Nguyễn Văn An'), 'NV');
    assert.equal(getInitials('John Doe'), 'JD');
    assert.equal(getInitials('Le Thi Mai'), 'LT');
    assert.equal(getInitials('jean-luc picard'), 'JL');
  });

  await t.test('handles single-word names by taking first 2 characters in uppercase', () => {
    assert.equal(getInitials('Admin'), 'AD');
    assert.equal(getInitials('Phúc'), 'PH');
    assert.equal(getInitials('Nam'), 'NA');
    assert.equal(getInitials('user'), 'US');
  });

  await t.test('handles single character names', () => {
    assert.equal(getInitials('A'), 'A');
    assert.equal(getInitials('z'), 'Z');
  });

  await t.test('falls back to email prefix when name is missing', () => {
    assert.equal(getInitials('', 'administrator@example.com'), 'AD');
    assert.equal(getInitials(null, 'john.doe@gmail.com'), 'JD');
  });

  await t.test('falls back to US when name and email are both empty', () => {
    assert.equal(getInitials('', ''), 'US');
    assert.equal(getInitials(null, null), 'US');
  });

  await t.test('getAvatarGradient returns consistent deterministic gradient', () => {
    const g1 = getAvatarGradient('Admin');
    const g2 = getAvatarGradient('Admin');
    assert.equal(g1, g2);
    assert.ok(typeof g1 === 'string' && g1.startsWith('from-'));
  });
});
