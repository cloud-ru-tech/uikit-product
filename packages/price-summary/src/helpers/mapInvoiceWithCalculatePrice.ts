import { CalculatePriceData, EntityInvoiceItem, InvoiceDetails } from '../types';

type SkuFlags = {
  available?: boolean;
  covered?: boolean;
};

export type InvoiceAvailabilitySplit = {
  invoice: InvoiceDetails[] | undefined;
  unavailableItems: EntityInvoiceItem[] | undefined;
};

type InvoiceDetailsAvailabilitySplit = {
  availableDetails?: InvoiceDetails;
  unavailableItems: EntityInvoiceItem[];
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

function getSkuFlagsForEntity(item: EntityInvoiceItem, skuFlagsById: Map<string, SkuFlags>) {
  return item.id ? skuFlagsById.get(item.id) : undefined;
}

function mapInvoiceEntityWithSkuFlags(item: EntityInvoiceItem, skuFlagsById: Map<string, SkuFlags>): EntityInvoiceItem {
  const skuFlags = getSkuFlagsForEntity(item, skuFlagsById);

  if (skuFlags?.available === false) {
    return { ...item, coveredByGrants: undefined };
  }

  if (skuFlags?.covered === undefined) {
    return item;
  }

  return {
    ...item,
    coveredByGrants: skuFlags.covered,
  };
}

function splitInvoiceDetailsByAvailability(
  details: InvoiceDetails,
  skuFlagsById: Map<string, SkuFlags>,
): InvoiceDetailsAvailabilitySplit {
  const availableItems: EntityInvoiceItem[] = [];
  const unavailableItems: EntityInvoiceItem[] = [];

  details.items.forEach(item => {
    const mappedItem = mapInvoiceEntityWithSkuFlags(item, skuFlagsById);

    if (getSkuFlagsForEntity(item, skuFlagsById)?.available === false) {
      unavailableItems.push(mappedItem);
      return;
    }

    availableItems.push(mappedItem);
  });

  if (!unavailableItems.length) {
    return {
      availableDetails: {
        ...details,
        items: availableItems,
      },
      unavailableItems,
    };
  }

  if (!availableItems.length) {
    return { unavailableItems };
  }

  return {
    availableDetails: {
      title: details.title,
      items: availableItems,
    },
    unavailableItems,
  };
}

export function mapInvoiceWithCalculatePrice(
  invoice: InvoiceDetails[] | undefined,
  calculatePriceData: CalculatePriceData | undefined,
): InvoiceDetails[] | undefined {
  if (!invoice?.length || !calculatePriceData?.skuResults.length) {
    return invoice;
  }

  const skuFlagsById = getSkuFlagsById(calculatePriceData);

  return invoice.map(details => ({
    ...details,
    items: details.items.map(item => mapInvoiceEntityWithSkuFlags(item, skuFlagsById)),
  }));
}

export function splitInvoiceByAvailability(
  invoice: InvoiceDetails[] | undefined,
  calculatePriceData: CalculatePriceData | undefined,
): InvoiceAvailabilitySplit {
  const nonEmptyInvoice = invoice?.filter(details => details.items.length > 0);
  const invoiceWithItems = nonEmptyInvoice?.length === invoice?.length ? invoice : nonEmptyInvoice;

  if (!invoiceWithItems?.length || !calculatePriceData?.skuResults.length) {
    return { invoice: invoiceWithItems, unavailableItems: undefined };
  }

  const skuFlagsById = getSkuFlagsById(calculatePriceData);
  const detailsSplits = invoiceWithItems.map(details => splitInvoiceDetailsByAvailability(details, skuFlagsById));
  const availableInvoice = detailsSplits.flatMap(({ availableDetails }) =>
    availableDetails ? [availableDetails] : [],
  );
  const unavailableItems = detailsSplits.flatMap(detailsSplit => detailsSplit.unavailableItems);

  if (!unavailableItems.length) {
    return { invoice: availableInvoice, unavailableItems: undefined };
  }

  return { invoice: availableInvoice, unavailableItems };
}
