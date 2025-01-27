import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  Total = 'total',
  Vat = 'vat',
  PricePeriodYear = 'pricePeriodYear',
  PricePeriodMonth = 'pricePeriodMonth',
  PricePeriodDay = 'pricePeriodDay',
  PricePeriodHour = 'pricePeriodHour',
  PricePeriodMinute = 'pricePeriodMinute',
  Price = 'price',
  BasePrice = 'basePrice',
  Discount = 'discount',
  OrderDetails = 'orderDetails',
  DocsLink = 'docsLink',
  DataError = 'dataError',
  CostLink = 'costLink',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Total]: 'Итого',
    [Texts.Vat]: 'с учётом НДС',
    [Texts.PricePeriodYear]: 'в год',
    [Texts.PricePeriodMonth]: 'в месяц',
    [Texts.PricePeriodDay]: 'в день',
    [Texts.PricePeriodHour]: 'в час',
    [Texts.PricePeriodMinute]: 'в минуту',
    [Texts.Price]: 'Стоимость',
    [Texts.BasePrice]: 'Базовая цена',
    [Texts.Discount]: 'Скидка',
    [Texts.OrderDetails]: 'Детализация заказа',
    [Texts.DocsLink]: 'Подробнее о тарифах и ценах',
    [Texts.DataError]: 'Ошибка загрузки',
    [Texts.CostLink]: 'Подробнее о стоимости',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Total]: 'Total',
    [Texts.Vat]: 'including VAT',
    [Texts.PricePeriodYear]: 'per year',
    [Texts.PricePeriodMonth]: 'per month',
    [Texts.PricePeriodDay]: 'per day',
    [Texts.PricePeriodHour]: 'per hour',
    [Texts.PricePeriodMinute]: 'per minute',
    [Texts.Price]: 'Price',
    [Texts.BasePrice]: 'Base price',
    [Texts.Discount]: 'Discount',
    [Texts.OrderDetails]: 'Order details',
    [Texts.DocsLink]: 'More about tariffs and prices',
    [Texts.DataError]: 'Loading error',
    [Texts.CostLink]: 'More about the cost',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'no-access');
