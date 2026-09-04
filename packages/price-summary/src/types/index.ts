import { QuestionTooltipProps } from '@cloud-ru/uikit-product-mobile-tooltip';

export enum PricePeriod {
  Year = 'year',
  Month = 'month',
  Day = 'day',
  Hour = 'hour',
  Minute = 'minute',
}

export type TotalSumType = 'equal' | 'from' | 'to';

export type TotalValueRange = {
  min: number;
  max: number;
};

export type DiscountItem = {
  value: number;
  percent?: number;
  tooltip?: QuestionTooltipProps['tip'];
};

export type DiscountDetails = {
  price: number;
  discounts: DiscountItem[];
};

export type PriceInvoiceItem = {
  label: string;
  discount?: DiscountItem;
};

export type DiscountInvoiceItem = {
  discount: DiscountItem;
};

export type BaseInvoiceItem = (PriceInvoiceItem | DiscountInvoiceItem) & {
  labelTooltip?: QuestionTooltipProps['tip'];
  price?: number;
  priceColor?: 'default' | 'changed';
  hidePrice?: boolean;
  labelMaxLines?: number;
  quantity?: string | number;
  topDivider?: boolean;
  bottomDivider?: boolean;
};

export type PrimaryInvoiceItem = BaseInvoiceItem & {
  primary: true;
  id?: string;
  coveredByGrant?: boolean;
};

export type SecondaryInvoiceItem = BaseInvoiceItem & {
  primary?: false;
  id?: never;
  coveredByGrant?: never;
};

export type InvoiceItem = PrimaryInvoiceItem | SecondaryInvoiceItem;

export type InvoiceDetails = {
  title?: string;
  quantity?: string | number;
  price?: number;
  items: InvoiceItem[];
};

export type PriceDeltaDetails = {
  value: number;
  type: 'increased' | 'decreased';
};

export type PriceChangeDetails = {
  /**
   * Signed difference between the current and previous price.
   * A positive value increases the cost, a negative value is a discount.
   */
  value: number;
  percentage?: number;
};

export type SkuPriceResult = {
  skuId?: string;
  skuCode?: string;
  resourceSpecCode?: string;
  resourceSpecCodeId?: string;
  skuAvailability?: boolean;
  coveredByGrants?: boolean;
};

export type CalculatePriceData = {
  skuResults: SkuPriceResult[];
  allow?: boolean;
};

/** @deprecated Use CalculatePriceData instead. */
export type CalculatePriceResponse = CalculatePriceData;
