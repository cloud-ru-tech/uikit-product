import { DEFAULT_PRICE } from '../constants';

export function getPrice({
  price = DEFAULT_PRICE,
  pricePeriod,
  partners,
}: {
  price?: typeof DEFAULT_PRICE;
  pricePeriod: string;
  partners?: boolean;
}) {
  if (partners) {
    switch (pricePeriod) {
      case 'day': {
        return price?.pricePartnersDayNds;
      }
      case 'hour': {
        return price?.pricePartnersHourNds;
      }
      case 'month':
      default: {
        return price?.pricePartnersMonthNds;
      }
    }
  }
  switch (pricePeriod) {
    case 'day': {
      return price?.priceDayNds;
    }
    case 'hour': {
      return price?.priceHourNds;
    }
    case 'month':
    default: {
      return price?.priceMonthNds;
    }
  }
}
