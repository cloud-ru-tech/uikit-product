import { QuestionTooltipProps } from '@cloud-ru/uikit-product-mobile-tooltip';

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

export type BaseInvoiceItem = (PriceInvoiceItem | DiscountInvoiceItem) & {
  labelTooltip?: QuestionTooltipProps['tip'];
  price?: number;
  hidePrice?: boolean;
  labelMaxLines?: number;
  quantity?: string | number;
  topDivider?: boolean;
  bottomDivider?: boolean;
};

export type PrimaryInvoiceItem = BaseInvoiceItem & {
  primary: true;
  coveredByGrant?: boolean;
};

export type SecondaryInvoiceItem = BaseInvoiceItem & {
  primary?: false;
  coveredByGrant?: never;
};

export type InvoiceItem = PrimaryInvoiceItem | SecondaryInvoiceItem;

export type InvoiceDetails = {
  title?: string;
  quantity?: string | number;
  price?: number;
  items: InvoiceItem[];
};
