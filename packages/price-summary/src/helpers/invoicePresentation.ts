import { EntityInvoiceItem, InvoiceDetails } from '../types';

export function getInvoiceCoverage(invoice: InvoiceDetails[] | undefined): boolean | undefined {
  const items = invoice?.flatMap(details => details.items) ?? [];
  const coverage = items[0]?.coveredByGrants;

  if (coverage === undefined) {
    return undefined;
  }

  return items.every(item => item.coveredByGrants === coverage) ? coverage : undefined;
}

export function splitInvoiceByCoverage(invoice: InvoiceDetails[]): InvoiceDetails[] {
  return invoice.flatMap(details => {
    if (!details.items.length) {
      return [details];
    }

    const buckets: { coveredByGrants: boolean | undefined; items: EntityInvoiceItem[] }[] = [];

    details.items.forEach(item => {
      const coveredByGrants = item.coveredByGrants;
      const bucket = buckets.find(current => current.coveredByGrants === coveredByGrants);

      if (bucket) {
        bucket.items.push(item);
        return;
      }

      buckets.push({ coveredByGrants, items: [item] });
    });

    return buckets.map(({ items }) => ({
      ...details,
      items,
    }));
  });
}
