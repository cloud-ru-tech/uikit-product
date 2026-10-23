import { describe, expect, it } from 'vitest';

import { formatPassport, normalizePassport } from '../utils';

describe('formatPassport', () => {
  it.each([
    ['', ''],
    ['1', '1'],
    ['1234', '1234'],
    ['12345', '1234 5'],
    ['1234567890', '1234 567890'],
    ['1234 567890', '1234 567890'],
    ['12345678901', '1234 567890'],
    ['1234 ', '1234'],
    ['12-34 №567890', '1234 567890'],
    ['abc', ''],
  ])('should format %s as %s', (raw, expected) => {
    expect(formatPassport(raw)).toBe(expected);
  });
});

describe('normalizePassport', () => {
  it.each([
    ['', ''],
    ['1234 5', '12345'],
    ['1234 567890', '1234567890'],
    ['12345678901', '1234567890'],
    ['12-34 №567890', '1234567890'],
  ])('should normalize %s to %s', (raw, expected) => {
    expect(normalizePassport(raw)).toBe(expected);
  });
});
