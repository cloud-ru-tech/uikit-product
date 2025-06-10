import './matchMedia';

import { describe, expect, it } from 'vitest';

import { ALL_COUNTRY_CODES } from '../countries';
import { formatPhoneNumber } from '../utils';
import { phoneFormatCases } from './constants';

describe('Checking the mask overlay for each number', () => {
  phoneFormatCases.forEach(({ country, input, expected }) => {
    it(`should format the number correctly for ${country}`, () => {
      expect(formatPhoneNumber(input, ALL_COUNTRY_CODES)).toBe(expected);
    });
  });
});
