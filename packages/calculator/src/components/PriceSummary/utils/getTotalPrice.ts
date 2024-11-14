import { DEFAULT_PRICE } from '../../../constants';
import { Price } from '../../../types';

export function getTotalPrice(price: Record<string, { price: Price }[]>) {
  const total = { ...DEFAULT_PRICE };

  Object.values(price).forEach((productPriceArr: { price: Price }[]) => {
    productPriceArr.forEach(({ price: priceElem = {} as Price }) => {
      total.priceMonthNds = total.priceMonthNds + priceElem.priceMonthNds;
      total.priceDayNds = total.priceDayNds + priceElem.priceDayNds;
      total.priceHourNds = total.priceHourNds + priceElem.priceHourNds;
      total.pricePartnersDayNds = total.pricePartnersDayNds + priceElem.pricePartnersDayNds;
      total.pricePartnersHourNds = total.pricePartnersHourNds + priceElem.pricePartnersHourNds;
      total.pricePartnersMonthNds = total.pricePartnersMonthNds + priceElem.pricePartnersMonthNds;
    });
  });

  return total;
}
