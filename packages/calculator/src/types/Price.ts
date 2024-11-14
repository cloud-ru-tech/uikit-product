import { ValueOf } from '@snack-uikit/utils';

export type Price = {
  priceHourNds: number;
  priceDayNds: number;
  priceMonthNds: number;
  pricePartnersHourNds: number;
  pricePartnersDayNds: number;
  pricePartnersMonthNds: number;
};

export const PRICE_PERIOD = {
  Month: 'month',
  Day: 'day',
  Hour: 'hour',
} as const;

export type PricePeriod = ValueOf<typeof PRICE_PERIOD>;
