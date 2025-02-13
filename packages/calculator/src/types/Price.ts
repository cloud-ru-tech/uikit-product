import { ValueOf } from '@snack-uikit/utils';

export type Price = {
  priceHourNds: number;
  priceDayNds: number;
  priceMonthNds: number;
  pricePartnersHourNds: number;
  pricePartnersDayNds: number;
  pricePartnersMonthNds: number;
};

export enum PRICE_PERIOD {
  Month = 'month',
  Day = 'day',
  Hour = 'hour',
}

export type PricePeriod = ValueOf<typeof PRICE_PERIOD>;
