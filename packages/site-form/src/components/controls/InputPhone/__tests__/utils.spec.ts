import { describe, expect, it } from 'vitest';

import { valSchema } from '../../../../validation/valSchema';
import { formatPhone, getCaretPosition, normalizePhone } from '../utils';

describe('formatPhone', () => {
  it.each([
    ['', ''],
    ['7', '+7'],
    ['8', '+7'],
    ['9', '+7 (9'],
    ['1', '+7 (1'],
    ['5', '+7 (5'],
    ['+', '+'],
    ['+1', '+7 (1'],
    ['+8', '+7 (8'],
    ['+ (916', '+7 (916'],
    ['+7 (916', '+7 (916'],
    ['+7 (9161', '+7 (916) 1'],
    ['+7 (916) 123-4', '+7 (916) 123-4'],
    ['89881234567', '+7 (988) 123-45-67'],
    ['9881234567', '+7 (988) 123-45-67'],
    ['+7 (988) 888-88-889', '+7 (988) 888-88-88'],
    ['+7 (916) ', '+7 (916'],
    ['+44 20 7946 0958', '+7 (442) 079-46-09'],
    ['abc', ''],
  ])('should format %s as %s', (raw, expected) => {
    expect(formatPhone(raw)).toBe(expected);
  });
});

describe('normalizePhone', () => {
  it.each([
    ['', ''],
    ['8', '+7'],
    ['+7 (988) 888-88-88', '+79888888888'],
    ['8 (988) 888-88-88', '+79888888888'],
    ['1', '+71'],
    ['+', '+'],
  ])('should normalize %s to %s', (raw, expected) => {
    expect(normalizePhone(raw)).toBe(expected);
  });

  it('should keep formatted value stable after normalization', () => {
    expect(formatPhone(normalizePhone('+7 (988) 888-88-88'))).toBe('+7 (988) 888-88-88');
  });
});

describe('getCaretPosition', () => {
  it('should place caret after the n-th digit', () => {
    expect(getCaretPosition('+7 (916) 1', 4)).toBe(7);
    expect(getCaretPosition('+7 (916) 1', 5)).toBe(10);
    expect(getCaretPosition('+7 (9', 0)).toBe(1);
  });
});

describe('phone validation pattern', () => {
  const { pattern } = valSchema.phone;

  it.each([
    ['+79888888888', true],
    ['+7988888888', false],
    ['+12345678901', false],
    ['+7', false],
  ])('should validate %s as %s', (value, valid) => {
    expect(pattern.value.test(value)).toBe(valid);
  });
});
