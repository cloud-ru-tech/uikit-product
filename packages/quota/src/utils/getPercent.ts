import { QuotaItem } from '../types';

export function getPercent(quota: QuotaItem): number {
  if (quota.usage === 0) {
    return quota.limit === 0 ? 100 : 0;
  }

  return (quota.usage / quota.limit) * 100;
}
