import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import { PricePeriod } from '@cloud-ru/uikit-product-price-summary';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PriceSummary, PriceSummaryProps } from '../src/components';
import { CalculatePriceData, InvoiceDetails, SkuPriceResult } from '../src/types';

const meta: Meta = {
  title: 'Console/Price Summary/Price Summary',
  component: PriceSummary,
};
export default meta;

type StoryProps = PriceSummaryProps & {
  showSingleGroup: boolean;
  showCoveredByGrantLabel: boolean;
  useCalculatePriceData: boolean;
  showChangedPrice: boolean;
  showPriceChange: boolean;
  deltaType: 'increased' | 'decreased';
  deltaValue: number;
  priceChangeValue: number;
  priceChangePercentage?: number;
  totalValueRangeMin?: number;
  totalValueRangeMax: number;
};

const INVOICE_SAMPLE: InvoiceDetails[] = [
  {
    title: 'Label',
    subtitle: 'Subtitle',
    items: [
      {
        label: 'Label',
        labelTooltip: 'label tooltip',
        quantity: 1,
        price: 9999999.99,
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
        kind: 'entity',
        id: 'sample-uncovered',
        parameters: [
          {
            kind: 'parameter',
            label: 'Label',
            quantity: 1,
            price: 9999999.99,
            discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
          },
          {
            label: 'Label',
            labelTooltip: 'label tooltip',
            quantity: 1,
            price: 9999999.99,
            priceColor: 'changed',
            kind: 'parameter',
          },
        ],
      },
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
        kind: 'entity',
        id: 'sample-covered',
      },
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        priceColor: 'changed',
        kind: 'entity',
        id: 'sample-covered',
        parameters: [
          {
            label: 'Text describing the characteristic text describing the characteristic',
            labelMaxLines: 1,
            kind: 'parameter',
          },
          {
            kind: 'discount',
            discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
          },
        ],
      },
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        priceColor: 'changed',
        kind: 'entity',
        id: 'sample-uncovered',
      },
    ],
  },
  {
    title: 'Covered by grant block',
    items: [
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        kind: 'entity',
        id: 'sample-covered',
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
      },
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        kind: 'entity',
        id: 'sample-covered',
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
      },
    ],
  },
  {
    title: 'Not covered by grant block',
    items: [
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        kind: 'entity',
        id: 'sample-uncovered',
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
      },
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        kind: 'entity',
        id: 'sample-uncovered',
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
      },
    ],
  },
];

const INVOICE_CALCULATE_PRICE_DATA: CalculatePriceData = {
  skuResults: [
    { skuId: 'sample-covered', skuAvailability: true, coveredByGrants: true },
    { skuId: 'sample-uncovered', skuAvailability: true, coveredByGrants: false },
  ],
};

const CALCULATE_PRICE_SKU_IDS = {
  coveredByGrants: 'sku-covered-by-grant',
  notCoveredByGrant: 'sku-not-covered-by-grant',
  unavailableByContract: 'sku-unavailable-by-contract',
  allCoveredFirst: 'sku-all-covered-first',
  allCoveredSecond: 'sku-all-covered-second',
} as const;

const CALCULATE_PRICE_SKU_RESULTS_SAMPLE: SkuPriceResult[] = [
  {
    skuCode: CALCULATE_PRICE_SKU_IDS.coveredByGrants,
    skuAvailability: true,
    coveredByGrants: true,
  },
  {
    skuCode: CALCULATE_PRICE_SKU_IDS.notCoveredByGrant,
    skuAvailability: true,
    coveredByGrants: false,
  },
  {
    skuCode: CALCULATE_PRICE_SKU_IDS.unavailableByContract,
    skuAvailability: false,
    coveredByGrants: true,
  },
  {
    skuCode: CALCULATE_PRICE_SKU_IDS.allCoveredFirst,
    skuAvailability: true,
    coveredByGrants: true,
  },
  {
    skuCode: CALCULATE_PRICE_SKU_IDS.allCoveredSecond,
    skuAvailability: true,
    coveredByGrants: true,
  },
];

const CALCULATE_PRICE_DATA_SAMPLE: CalculatePriceData = {
  skuResults: CALCULATE_PRICE_SKU_RESULTS_SAMPLE,
};

const CALCULATE_PRICE_INVOICE_SAMPLE: InvoiceDetails[] = [
  {
    title: 'Есть покрытые и непокрытые грантом сервисы',
    items: [
      {
        id: CALCULATE_PRICE_SKU_IDS.coveredByGrants,
        label: 'Доступно и покрывается грантом',
        quantity: 1,
        price: 1000,
        kind: 'entity',
      },
      {
        id: CALCULATE_PRICE_SKU_IDS.notCoveredByGrant,
        label: 'Доступно и не покрывается грантом',
        quantity: 1,
        price: 1000,
        kind: 'entity',
      },
      {
        id: CALCULATE_PRICE_SKU_IDS.unavailableByContract,
        label: 'Недоступно по договору',
        quantity: 1,
        price: 1000,
        kind: 'entity',
      },
    ],
  },
  {
    title: 'Все покрыто',
    items: [
      {
        id: CALCULATE_PRICE_SKU_IDS.allCoveredFirst,
        label: 'Первый сервис покрывается грантом',
        quantity: 1,
        price: 1000,
        kind: 'entity',
      },
      {
        id: CALCULATE_PRICE_SKU_IDS.allCoveredSecond,
        label: 'Второй сервис покрывается грантом',
        quantity: 1,
        price: 1000,
        kind: 'entity',
      },
    ],
  },
  {
    title: 'Все не покрыто',
    items: [
      {
        id: CALCULATE_PRICE_SKU_IDS.notCoveredByGrant,
        label: 'Первый сервис не покрывается грантом',
        quantity: 1,
        price: 1000,
        kind: 'entity',
      },
      {
        id: CALCULATE_PRICE_SKU_IDS.notCoveredByGrant,
        label: 'Второй сервис не покрывается грантом',
        quantity: 1,
        price: 1000,
        kind: 'entity',
      },
    ],
  },
];

function getStoryTotalValue(
  useCalculatePriceData: boolean,
  showSingleGroup: boolean,
  defaultValue: PriceSummaryProps['value'],
): number | undefined {
  if (!useCalculatePriceData) {
    return typeof defaultValue === 'number' ? defaultValue : defaultValue?.min;
  }

  if (showSingleGroup) {
    return 2000;
  }

  return 4000;
}

function getStoryValue(
  numericValue: number | undefined,
  rangeMin: number | undefined,
  rangeMax: number,
): PriceSummaryProps['value'] {
  if (!rangeMin || !rangeMax) {
    return numericValue;
  }

  return { min: rangeMin, max: rangeMax };
}

const Template: StoryFn<StoryProps> = ({
  showSingleGroup,
  showCoveredByGrantLabel,
  useCalculatePriceData,
  showChangedPrice,
  showPriceChange,
  deltaType,
  deltaValue,
  priceChangeValue,
  priceChangePercentage,
  totalValueRangeMin,
  totalValueRangeMax,
  ...args
}) => {
  const [_, setArgs] = useArgs();

  const valueDelta = useMemo(() => {
    if (!showChangedPrice) {
      return undefined;
    }
    return { value: deltaValue, type: deltaType };
  }, [showChangedPrice, deltaValue, deltaType]);

  const priceChange = useMemo(() => {
    if (!showPriceChange) {
      return undefined;
    }

    return { value: priceChangeValue, percentage: priceChangePercentage };
  }, [showPriceChange, priceChangeValue, priceChangePercentage]);

  const calculatePriceData = useMemo<CalculatePriceData>(() => {
    const data = useCalculatePriceData ? CALCULATE_PRICE_DATA_SAMPLE : INVOICE_CALCULATE_PRICE_DATA;

    if (showCoveredByGrantLabel) {
      return data;
    }

    return {
      skuResults: data.skuResults.map(skuResult => ({
        ...skuResult,
        coveredByGrants: undefined,
      })),
    };
  }, [showCoveredByGrantLabel, useCalculatePriceData]);

  const invoice = useMemo(() => {
    let _invoice = useCalculatePriceData ? CALCULATE_PRICE_INVOICE_SAMPLE : INVOICE_SAMPLE;

    if (!showChangedPrice) {
      _invoice = _invoice.map(invoice => ({
        ...invoice,
        items: invoice.items.map(item => ({
          ...item,
          priceColor: undefined,
          parameters: item.parameters?.map(parameter => ({ ...parameter, priceColor: undefined })),
        })),
      }));
    }

    if (!showSingleGroup) {
      return _invoice;
    }

    return [_invoice[0]];
  }, [showSingleGroup, useCalculatePriceData, showChangedPrice]);

  return (
    <div style={{ maxWidth: 304 }}>
      <PriceSummary
        {...args}
        onPeriodChanged={period => setArgs({ ...args, period })}
        value={getStoryValue(
          getStoryTotalValue(useCalculatePriceData, showSingleGroup, args.value),
          totalValueRangeMin,
          totalValueRangeMax,
        )}
        invoice={invoice}
        calculatePriceData={calculatePriceData}
        valueDelta={valueDelta}
        priceChange={priceChange}
      />
    </div>
  );
};

export const priceSummary: StoryObj<StoryProps> = {
  render: Template,
  args: {
    showSingleGroup: false,
    value: 9999999.99,
    totalSumType: 'equal',
    hint: undefined,
    period: PricePeriod.Month,
    periodOptions: [PricePeriod.Hour, PricePeriod.Month],
    docsLink: {
      href: 'https://cloud.ru/documents/tariffs/index.html',
    },
    layoutType: 'desktop',
    showHintTooltip: false,
    hintTooltipText: '',
    hintLink: {
      text: 'hint link',
      href: '',
    },
    showHintLink: false,
    showCoveredByGrantLabel: true,
    useCalculatePriceData: false,
    showChangedPrice: false,
    showPriceChange: false,
    deltaType: 'increased',
    deltaValue: 1000,
    priceChangeValue: 5000,
    priceChangePercentage: 10,
    totalValueRangeMin: 0,
    totalValueRangeMax: 0,
    basePrice: 10000,
    freeTier: true,
  },
  argTypes: {
    periodOptions: {
      control: 'multi-select',
      options: Object.values(PricePeriod),
    },
    showSingleGroup: {
      name: '[Stories]: show single group',
      control: {
        type: 'boolean',
      },
    },
    hintAppearance: {
      name: '[Stories]: hintAppearance',
      control: {
        type: 'select',
      },
      options: ['default', 'warning', 'userError', 'systemError'],
    },
    showCoveredByGrantLabel: {
      name: '[Stories]: showCoveredByGrantLabel',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    useCalculatePriceData: {
      name: '[Stories]: use calculatePriceData example',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    showChangedPrice: {
      name: '[Stories]: showChangedPrice',
      control: {
        type: 'boolean',
      },
    },
    showPriceChange: {
      name: '[Stories]: show significant price change',
      control: {
        type: 'boolean',
      },
    },
    deltaType: {
      name: '[Stories]: deltaType',
      control: {
        type: 'select',
      },
      options: ['increased', 'decreased'],
    },
    deltaValue: {
      name: '[Stories]: deltaValue',
      control: {
        type: 'number',
      },
    },
    priceChangeValue: {
      name: '[Stories]: signed price change value',
      control: {
        type: 'number',
      },
    },
    priceChangePercentage: {
      name: '[Stories]: price change percentage',
      control: {
        type: 'text',
      },
    },
    totalValueRangeMin: {
      name: '[Stories]: total value range min',
      control: {
        type: 'number',
      },
    },
    totalValueRangeMax: {
      name: '[Stories]: total value range max',
      control: {
        type: 'number',
      },
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/wI0JfYnXUmWWorNhsMIWLF/Product-components?m=auto&node-id=4891-59089&t=DChWTK73FGL6trGn-1',
    },
  },
};
