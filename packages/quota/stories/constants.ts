import { QuotaItem } from '../src';

export const MOCK_QUOTA_ITEM: QuotaItem = {
  name: 'vCPU',
  limit: 100,
  usage: 42,
  remains: 58,
  unitDisplayName: 'cores',
};

export const MOCK_QUOTAS: QuotaItem[] = [
  { name: 'vCPU', limit: 100, usage: 42, remains: 58, unitDisplayName: 'cores' },
  { name: 'RAM', limit: 256, usage: 230, remains: 26, unitDisplayName: 'GB' },
  { name: 'SSD', limit: 1000, usage: 1000, remains: 0, unitDisplayName: 'GB' },
  { name: 'GPU A100', limit: 8, usage: 5, remains: 3, unitDisplayName: 'pcs' },
  { name: 'Public IP', limit: 10, usage: 9, remains: 1, unitDisplayName: 'pcs' },
  { name: 'S3 Storage', limit: 5000, usage: 2500, remains: 2500, unitDisplayName: 'GB' },
];
