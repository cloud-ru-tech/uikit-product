import { describe, expect, it } from 'vitest';

import { CalculatePriceData, InvoiceDetails } from '../../types';
import { mapInvoiceWithCalculatePrice } from '../mapInvoiceWithCalculatePrice';

const coveredSkuId = 'd4d5b1d9-7318-44c2-830b-5be7650f760f';
const uncoveredSkuId = 'ee5a2062-fdb3-43f9-a93e-2ae6224a35d6';
const unavailableSkuId = 'adb93523-71f8-4010-a469-3eb06079d4a5';
const resourceSpecCode = 'cpu.1c';

const invoice: InvoiceDetails[] = [
  {
    quantity: 1,
    title: 'Compute',
    price: 100,
    items: [
      { id: coveredSkuId, quantity: 1, primary: true, label: 'Covered SKU', price: 40 },
      { id: uncoveredSkuId, quantity: 1, primary: true, label: 'Uncovered SKU', price: 30 },
      { id: unavailableSkuId, quantity: 1, primary: true, label: 'Unavailable SKU', price: 20 },
      { quantity: 1, primary: false, label: 'Secondary SKU', price: 10 },
      { quantity: 1, primary: true, label: 'SKU without id', price: 10 },
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
    {
      resourceSpecCode,
      skuAvailability: true,
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

  it('should set coveredByGrant for available SKUs matched by resourceSpecCodeId', () => {
    const result = mapInvoiceWithCalculatePrice(invoice, calculatePriceData);

    expect(result?.[0].items[0]).toMatchObject({ id: coveredSkuId, coveredByGrant: true });
    expect(result?.[0].items[1]).toMatchObject({ id: uncoveredSkuId, coveredByGrant: false });
  });

  it('should not set coveredByGrant when skuAvailability is false', () => {
    const result = mapInvoiceWithCalculatePrice(invoice, calculatePriceData);

    expect(result?.[0].items[2]).toEqual(invoice[0].items[2]);
    expect(result?.[0].items[2]).not.toHaveProperty('coveredByGrant');
  });

  it('should not set coveredByGrant for secondary items or items without id', () => {
    const result = mapInvoiceWithCalculatePrice(invoice, calculatePriceData);

    expect(result?.[0].items[3]).toEqual(invoice[0].items[3]);
    expect(result?.[0].items[4]).toEqual(invoice[0].items[4]);
  });

  it('should match SKUs by resourceSpecCode', () => {
    const invoiceWithResourceSpecCode: InvoiceDetails[] = [
      {
        items: [{ id: resourceSpecCode, quantity: 1, primary: true, label: 'CPU', price: 100 }],
      },
    ];

    const result = mapInvoiceWithCalculatePrice(invoiceWithResourceSpecCode, calculatePriceData);

    expect(result?.[0].items[0]).toMatchObject({ id: resourceSpecCode, coveredByGrant: true });
  });
});
