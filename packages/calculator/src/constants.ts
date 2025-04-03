import { Price } from './types';

export const PLATFORM = {
  Advanced: 'advanced',
  MlSpace: 'mlspace',
  VmWare: 'vmware',
  Evolution: 'evolution',
  Test: 'test',
};

export const DEFAULT_PRICE: Price = {
  priceHourNds: 0,
  priceDayNds: 0,
  priceMonthNds: 0,
  pricePartnersHourNds: 0,
  pricePartnersDayNds: 0,
  pricePartnersMonthNds: 0,
};

export const CATEGORY = {
  Popular: 'popular',
  FreeTier: 'free-tier',
  Computations: 'computations',
  Network: 'network',
  Containerization: 'containerization',
  Storage: 'storage',
  Database: 'database',
  Development: 'development',
  Analytic: 'analytic',
  ML: 'ml-ai-tools',
} as const;

export const DEFAULT_CATEGORY = CATEGORY.Popular;

export const CALCULATOR_DATA_TEST_ID = 'calculator';

export enum WorkingHoursSpecification {
  Hour = 'hour',
  Day = 'day',
  Month = 'month',
}

export const WORKING_HOURS_ITEMS = [
  {
    value: WorkingHoursSpecification.Month,
    label: 'Месяц',
  },
  {
    value: WorkingHoursSpecification.Day,
    label: 'День',
  },
  {
    value: WorkingHoursSpecification.Hour,
    label: 'Час',
  },
];
