import { QuestionTooltipProps } from '@sbercloud/uikit-product-mobile-tooltip';

export enum PricePeriod {
  Month = 'month',
  Day = 'day',
  Hour = 'hour',
  Minute = 'minute',
}

export type DiscountItem = {
  value: number;
  percent?: number;
  tooltip?: QuestionTooltipProps['tip'];
};

export type DiscountDetails = {
  price: number;
  discounts: DiscountItem[];
};

export type InvoiceItem = {
  label: string;
  labelMaxLines?: number;
  quantity?: string | number;
  price?: number;
  discount?: DiscountItem;
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
