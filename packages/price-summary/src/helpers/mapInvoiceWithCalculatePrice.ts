import { CalculatePriceData, InvoiceDetails, InvoiceItem } from '../types';

type SkuFlags = {
  available?: boolean;
  covered?: boolean;
};

export type InvoiceAvailabilitySplit = {
  invoice: InvoiceDetails[] | undefined;
  unavailableItems: InvoiceItem[] | undefined;
};

type InvoiceDetailsAvailabilitySplit = {
  availableDetails?: InvoiceDetails;
  unavailableItems: InvoiceItem[];
};

function setSkuFlags(skuFlagsById: Map<string, SkuFlags>, key: string | undefined, flags: SkuFlags) {
  if (!key) {
    return;
  }

  skuFlagsById.set(key, flags);
}

function getSkuFlagsById(calculatePriceData: CalculatePriceData) {
  const skuFlagsById = new Map<string, SkuFlags>();

  calculatePriceData.skuResults.forEach(result => {
    const flags: SkuFlags = {
      available: result.skuAvailability,
      covered: result.coveredByGrants,
    };

    setSkuFlags(skuFlagsById, result.skuId, flags);
    setSkuFlags(skuFlagsById, result.resourceSpecCode, flags);
    setSkuFlags(skuFlagsById, result.resourceSpecCodeId, flags);
    setSkuFlags(skuFlagsById, result.skuCode, flags);
  });

  return skuFlagsById;
}

function isUnavailableInvoiceItem(item: InvoiceItem, skuFlagsById: Map<string, SkuFlags>) {
  if (!item.primary || !item.id) {
    return false;
  }

  return skuFlagsById.get(item.id)?.available === false;
}

function mapInvoiceItemWithSkuFlags(item: InvoiceItem, skuFlagsById: Map<string, SkuFlags>) {
  if (!item.primary || !item.id) {
    return item;
  }

  const skuFlags = skuFlagsById.get(item.id);

  if (!skuFlags || skuFlags.available === false) {
    return item;
  }

  return {
    ...item,
    coveredByGrant: skuFlags.covered,
  };
}

function splitInvoiceDetailsByAvailability(
  details: InvoiceDetails,
  skuFlagsById: Map<string, SkuFlags>,
): InvoiceDetailsAvailabilitySplit {
  const unavailableItems = details.items.filter(item => isUnavailableInvoiceItem(item, skuFlagsById));
  const availableItems = details.items
    .filter(item => !isUnavailableInvoiceItem(item, skuFlagsById))
    .map(item => mapInvoiceItemWithSkuFlags(item, skuFlagsById));

  if (!availableItems.length) {
    return { unavailableItems };
  }

  if (!unavailableItems.length) {
    return {
      availableDetails: {
        ...details,
        items: availableItems,
      },
      unavailableItems,
    };
  }

  return {
    availableDetails: {
      ...details,
      items: availableItems,
      price: undefined,
      quantity: undefined,
    },
    unavailableItems,
  };
}

export function mapInvoiceWithCalculatePrice(
  invoice: InvoiceDetails[] | undefined,
  calculatePriceData: CalculatePriceData | undefined,
) {
  if (!invoice?.length || !calculatePriceData?.skuResults.length) {
    return invoice;
  }

  const skuFlagsById = getSkuFlagsById(calculatePriceData);

  return invoice.map(details => ({
    ...details,
    items: details.items.map(item => mapInvoiceItemWithSkuFlags(item, skuFlagsById)),
  }));
}

export function splitInvoiceByAvailability(
  invoice: InvoiceDetails[] | undefined,
  calculatePriceData: CalculatePriceData | undefined,
): InvoiceAvailabilitySplit {
  if (!invoice?.length || !calculatePriceData?.skuResults.length) {
    return { invoice, unavailableItems: undefined };
  }

  const skuFlagsById = getSkuFlagsById(calculatePriceData);
  const detailsSplits = invoice.map(details => splitInvoiceDetailsByAvailability(details, skuFlagsById));
  const availableInvoice = detailsSplits.flatMap(({ availableDetails }) =>
    availableDetails ? [availableDetails] : [],
  );
  const unavailableItems = detailsSplits.flatMap(detailsSplit => detailsSplit.unavailableItems);

  if (!unavailableItems.length) {
    return { invoice: availableInvoice, unavailableItems: undefined };
  }

  return { invoice: availableInvoice, unavailableItems };
}
