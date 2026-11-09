import { describe, expect, it } from 'vitest';

import { CalculatePriceData, InvoiceDetails } from '../../types';
import { mapInvoiceWithCalculatePrice, splitInvoiceByAvailability } from '../mapInvoiceWithCalculatePrice';

const coveredSkuId = 'd4d5b1d9-7318-44c2-830b-5be7650f760f';
const uncoveredSkuId = 'ee5a2062-fdb3-43f9-a93e-2ae6224a35d6';
const unavailableSkuId = 'adb93523-71f8-4010-a469-3eb06079d4a5';

const invoice: InvoiceDetails[] = [
  {
    title: 'Compute',
    items: [
      {
        id: coveredSkuId,
        kind: 'entity',
        quantity: 1,
        label: 'Covered SKU',
        price: 40,
        coveredByGrants: false,
        parameters: [{ kind: 'parameter', label: '2 vCPU', price: 40 }],
      },
      {
        id: uncoveredSkuId,
        kind: 'entity',
        quantity: 1,
        label: 'Uncovered SKU',
        price: 30,
        coveredByGrants: true,
      },
      {
        id: unavailableSkuId,
        kind: 'entity',
        quantity: 1,
        label: 'Unavailable SKU',
        price: 20,
        coveredByGrants: true,
        discount: { value: 5, percent: 20 },
        parameters: [
          { kind: 'parameter', label: '4 vCPU', price: 20 },
          { kind: 'limit', label: 'Free up to 1 hour' },
          { kind: 'discount', discount: { value: 5, percent: 20 } },
        ],
      },
      { kind: 'entity', quantity: 1, label: 'SKU without id', price: 10, coveredByGrants: false },
    ],
  },
];

const calculatePriceData: CalculatePriceData = {
  skuResults: [
    {
      resourceSpecCodeId: coveredSkuId,
      skuAvailability: true,
      coveredByGrants: true,
    },
    {
      resourceSpecCodeId: uncoveredSkuId,
      skuAvailability: true,
      coveredByGrants: false,
    },
    {
      resourceSpecCodeId: unavailableSkuId,
      skuAvailability: false,
      coveredByGrants: true,
    },
  ],
};

describe('mapInvoiceWithCalculatePrice', () => {
  it('should return the original invoice when calculatePriceData is missing', () => {
    expect(mapInvoiceWithCalculatePrice(invoice, undefined)).toBe(invoice);
  });

  it('should return the original invoice when skuResults are empty', () => {
    expect(mapInvoiceWithCalculatePrice(invoice, { skuResults: [] })).toBe(invoice);
  });

  it('should overwrite manual coverage with calculated coverage without changing the input', () => {
    const result = mapInvoiceWithCalculatePrice(invoice, calculatePriceData);

    expect(result?.[0].items[0]).toEqual({ ...invoice[0].items[0], coveredByGrants: true });
    expect(result?.[0].items[1]).toEqual({ ...invoice[0].items[1], coveredByGrants: false });
    expect(invoice[0].items[0].coveredByGrants).toBe(false);
    expect(invoice[0].items[1].coveredByGrants).toBe(true);
  });

  it('should clear coverage for unavailable SKUs without changing the input', () => {
    const result = mapInvoiceWithCalculatePrice(invoice, calculatePriceData);

    expect(result?.[0].items[2]).toEqual({ ...invoice[0].items[2], coveredByGrants: undefined });
    expect(invoice[0].items[2].coveredByGrants).toBe(true);
  });

  it('should preserve manual coverage for entities without id', () => {
    const result = mapInvoiceWithCalculatePrice(invoice, calculatePriceData);

    expect(result?.[0].items[3]).toBe(invoice[0].items[3]);
  });

  it.each(['skuId', 'skuCode', 'resourceSpecCode', 'resourceSpecCodeId'] as const)(
    'should match SKUs by %s',
    identifier => {
      const result = mapInvoiceWithCalculatePrice(invoice, {
        skuResults: [{ [identifier]: coveredSkuId, skuAvailability: true, coveredByGrants: true }],
      });

      expect(result?.[0].items[0].coveredByGrants).toBe(true);
    },
  );

  it('should preserve manual coverage for unmatched SKUs and results without coverage', () => {
    const result = mapInvoiceWithCalculatePrice(invoice, {
      skuResults: [{ skuId: coveredSkuId, skuAvailability: true }],
    });

    expect(result?.[0].items[0]).toBe(invoice[0].items[0]);
    expect(result?.[0].items[1]).toBe(invoice[0].items[1]);
  });
});

describe('splitInvoiceByAvailability', () => {
  it.each([undefined, { skuResults: [] }])('should preserve the invoice without SKU results: %j', data => {
    const result = splitInvoiceByAvailability(invoice, data);

    expect(result.invoice).toBe(invoice);
    expect(result.unavailableItems).toBeUndefined();
  });

  it('should move an unavailable entity with all its parameters and map coverage of available entities', () => {
    const result = splitInvoiceByAvailability(invoice, calculatePriceData);

    expect(result.invoice).toEqual([
      {
        title: 'Compute',
        price: undefined,
        quantity: undefined,
        items: [
          { ...invoice[0].items[0], coveredByGrants: true },
          { ...invoice[0].items[1], coveredByGrants: false },
          invoice[0].items[3],
        ],
      },
    ]);
    expect(result.unavailableItems).toEqual([{ ...invoice[0].items[2], coveredByGrants: undefined }]);
    expect(invoice[0].items).toHaveLength(4);
    expect(invoice[0].items[2].coveredByGrants).toBe(true);
  });

  it('should combine unavailable entities from different categories and remove empty categories', () => {
    const firstEntity = invoice[0].items[0];
    const secondEntity = invoice[0].items[2];
    const result = splitInvoiceByAvailability(
      [
        { title: 'First category', items: [firstEntity] },
        { title: 'Second category', items: [secondEntity] },
      ],
      {
        skuResults: [
          { skuId: firstEntity.id, skuAvailability: false },
          { skuId: secondEntity.id, skuAvailability: false },
        ],
      },
    );

    expect(result.invoice).toEqual([]);
    expect(result.unavailableItems).toEqual([
      { ...firstEntity, coveredByGrants: undefined },
      { ...secondEntity, coveredByGrants: undefined },
    ]);
  });

  it('should preserve category totals when no entities are unavailable', () => {
    const result = splitInvoiceByAvailability(invoice, {
      skuResults: [{ skuId: coveredSkuId, skuAvailability: true, coveredByGrants: true }],
    });

    expect(result.invoice?.[0]).toEqual({
      ...invoice[0],
      items: [{ ...invoice[0].items[0], coveredByGrants: true }, ...invoice[0].items.slice(1)],
    });
    expect(result.unavailableItems).toBeUndefined();
  });
});
