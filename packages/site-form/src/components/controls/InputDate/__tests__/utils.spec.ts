import { describe, expect, it } from 'vitest';

import { fromUtcIsoDate, toUtcIsoDate } from '../utils';

describe('toUtcIsoDate', () => {
  it('should move local midnight to UTC midnight of the same day', () => {
    expect(toUtcIsoDate(new Date(1990, 0, 31))).toBe('1990-01-31T00:00:00.000Z');
  });

  it('should drop the time', () => {
    expect(toUtcIsoDate(new Date(1990, 0, 31, 23, 59))).toBe('1990-01-31T00:00:00.000Z');
  });
});

describe('fromUtcIsoDate', () => {
  it('should return local midnight of the same day', () => {
    const date = fromUtcIsoDate('1990-01-31T00:00:00.000Z');

    expect([date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()]).toEqual([1990, 0, 31, 0]);
  });

  it('should be the inverse of toUtcIsoDate', () => {
    expect(toUtcIsoDate(fromUtcIsoDate('2000-02-29T00:00:00.000Z'))).toBe('2000-02-29T00:00:00.000Z');
  });
});
