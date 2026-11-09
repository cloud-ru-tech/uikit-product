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
  label?: string;
  valueFormat?: 'amount' | 'percent';
  tooltip?: QuestionTooltipProps['tip'];
};

export type DiscountDetails = {
  /** @deprecated Pass the base price through `PriceSummary.basePrice`. */
  price?: number;
  discounts: DiscountItem[];
};

export type PriceInvoiceItem = {
  label: string;
  discount?: DiscountItem;
};

export type DiscountInvoiceItem = {
  discount: DiscountItem;
};

type InvoiceRowProps = {
  unit?: string;
  labelTooltip?: QuestionTooltipProps['tip'];
  price?: number;
  priceColor?: 'default' | 'changed';
  hidePrice?: boolean;
  labelMaxLines?: number;
  quantity?: string | number;
};

export type BaseInvoiceItem = (PriceInvoiceItem | DiscountInvoiceItem) &
  InvoiceRowProps & {
    kind?: 'entity' | 'parameter' | 'limit' | 'discount';
  };

export type EntityInvoiceItem = PriceInvoiceItem &
  InvoiceRowProps & {
    kind: 'entity';
    id?: string;
    coveredByGrants?: boolean;
    parameters?: InvoiceParameterItem[];
  };

export type InvoiceParameterItem =
  | (PriceInvoiceItem & InvoiceRowProps & { kind: 'parameter' | 'limit' })
  | (DiscountInvoiceItem & InvoiceRowProps & { kind: 'discount' });

/** @deprecated Use `EntityInvoiceItem` with `kind: 'entity'` and an `id` matched to `calculatePriceData`. */
export type PrimaryInvoiceItem = BaseInvoiceItem & {
  kind?: never;
  primary: true;
  id?: string;
  coveredByGrant?: boolean;
  parameters?: Array<InvoiceParameterItem | SecondaryInvoiceItem>;
};

/** @deprecated Use `InvoiceParameterItem` with an explicit `kind`. */
export type SecondaryInvoiceItem = BaseInvoiceItem & {
  kind?: never;
  primary?: false;
  id?: never;
  coveredByGrant?: never;
};

export type InvoiceEntityInputItem = EntityInvoiceItem;

export type InvoiceItem = InvoiceEntityInputItem | InvoiceParameterItem;

export type InvoiceDetails = {
  title: string;
  subtitle?: string;
  items: EntityInvoiceItem[];
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
  tooltip?: QuestionTooltipProps['tip'];
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
