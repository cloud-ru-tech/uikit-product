import { QuestionTooltipProps } from '@sbercloud/uikit-product-mobile-tooltip';

export enum PricePeriod {
  Year = 'year',
  Month = 'month',
  Day = 'day',
  Hour = 'hour',
  Minute = 'minute',
}

export type TotalSumType = 'equal' | 'from';

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

export type InvoiceItem = (PriceInvoiceItem | DiscountInvoiceItem) & {
  labelTooltip?: QuestionTooltipProps['tip'];
  price?: number;
  hidePrice?: boolean;
  labelMaxLines?: number;
  quantity?: string | number;
  primary?: boolean;
  topDivider?: boolean;
  bottomDivider?: boolean;
};

export type InvoiceDetails = {
  title?: string;
  quantity?: string | number;
  price?: number;
  items: InvoiceItem[];
};
