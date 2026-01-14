import { describe, expect, it, vi } from 'vitest';

import { ALL_COUNTRY_CODES } from '../countries';
import { handleAutoInsert } from '../utils';
import { handleAutoInsertCases } from './constants';

const OPTIONS = ALL_COUNTRY_CODES.map(c => ({
  id: c.value,
  iso2: c.iso2,
  mask: c.mask,
  content: {
    caption: c.caption,
    option: c.value,
  },
  beforeContent: null,
}));

const byId = (id: string) => {
  const found = OPTIONS.find(c => c.id === id);
  if (!found) throw new Error(`Country not found in OPTIONS: ${id}`);
  return found;
};

type BaseCase = {
  name: string;
  raw: string;
  currentId: string;
};

type NoCallsCase = BaseCase;

type ExactCase = BaseCase & {
  expectedValue: string;
  expectedCountryId?: string;
};

const casesNoCalls: NoCallsCase[] = handleAutoInsertCases.filter(
  (c): c is NoCallsCase => !('expectedValue' in c) && !('expectedLengthFromCountryId' in c),
);

const casesExact: ExactCase[] = handleAutoInsertCases.filter((c): c is ExactCase => 'expectedValue' in c);

describe('handleAutoInsert — no calls', () => {
  casesNoCalls.forEach(tc => {
    it(`${tc.name}`, () => {
      const onValueChange = vi.fn();
      const onCountryChange = vi.fn();

      handleAutoInsert({
        raw: tc.raw,
        onValueChange,
        onCountryChange,
        country: byId(tc.currentId),
        options: OPTIONS,
      });

      expect(onCountryChange).not.toHaveBeenCalled();
      expect(onValueChange).not.toHaveBeenCalled();
    });
  });
});

describe('handleAutoInsert — exact value', () => {
  casesExact.forEach(tc => {
    it(`${tc.name}`, () => {
      const onValueChange = vi.fn();
      const onCountryChange = vi.fn();

      handleAutoInsert({
        raw: tc.raw,
        onValueChange,
        onCountryChange,
        country: byId(tc.currentId),
        options: OPTIONS,
      });

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledWith(tc.expectedValue);

      const expectedCountryCalls = tc.expectedCountryId ? 1 : 0;
      expect(onCountryChange).toHaveBeenCalledTimes(expectedCountryCalls);

      const actualCountryId = onCountryChange.mock.calls[0]?.[0]?.id;
      expect(actualCountryId).toBe(tc.expectedCountryId);
    });
  });
});
