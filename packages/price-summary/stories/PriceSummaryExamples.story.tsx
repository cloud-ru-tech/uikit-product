import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { PriceSummary, PriceSummaryProps } from '../src/components';
import { CalculatePriceData, InvoiceDetails, PricePeriod, SkuPriceResult } from '../src/types';

const meta: Meta<typeof PriceSummary> = {
  title: 'Console/Price Summary/Examples',
  component: PriceSummary,
  argTypes: {
    periodOptions: {
      control: 'multi-select',
      options: Object.values(PricePeriod),
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Qchn4XCMqBobdzAVMIGY7F/Price-Summary?node-id=54096-26829',
    },
  },
};
export default meta;

const TIME_INVOICE: InvoiceDetails[] = [
  {
    title: 'Вычислительные ресурсы',
    items: [
      {
        id: 'agent',
        kind: 'entity',
        label: 'Экземпляр агента',
        quantity: 1,
        price: 1.92,
        parameters: [
          { kind: 'parameter', label: '1 vCPU на экземпляр' },
          { kind: 'parameter', label: '2 ГБ RAM на экземпляр' },
        ],
      },
    ],
  },
];

const USAGE_INVOICE: InvoiceDetails[] = [
  {
    title: 'AI-модели',
    items: [
      {
        id: 'ai-model',
        kind: 'entity',
        label: 'GigaChat3.5-432B-A28B-Reasoning',
        parameters: [
          { kind: 'parameter', label: 'Входящие токены', unit: '1 млн', price: 96.22 },
          { kind: 'parameter', label: 'Исходящие токены', unit: '1 млн', price: 288.6 },
        ],
      },
    ],
  },
  {
    title: 'Хранение данных',
    items: [
      {
        id: 'storage',
        kind: 'entity',
        label: 'Хранение',
        unit: '1 ГБ',
        price: 1.84,
        parameters: [{ kind: 'limit', label: 'Бесплатно до 15 ГБ в месяц' }],
      },
    ],
  },
  {
    title: 'Запросы и операции',
    items: [
      {
        id: 'get-head',
        kind: 'entity',
        label: 'GET, HEAD',
        unit: '1000 шт',
        price: 0.03,
        parameters: [{ kind: 'limit', label: 'Бесплатно до 1 млн в месяц' }],
      },
      {
        id: 'list-post-put',
        kind: 'entity',
        label: 'LIST, POST, PUT',
        unit: '1000 шт',
        price: 0.11,
        parameters: [{ kind: 'limit', label: 'Бесплатно до 100 тыс. в месяц' }],
      },
      { id: 'delete', kind: 'entity', label: 'DELETE', unit: '1000 шт', price: 0 },
    ],
  },
  {
    title: 'Трафик',
    items: [
      {
        id: 'outgoing-traffic',
        kind: 'entity',
        label: 'Исходящий трафик',
        unit: '1 ГБ',
        price: 1.17,
        parameters: [{ kind: 'limit', label: 'Бесплатно до 10 ТБ в месяц' }],
      },
      { id: 'incoming-traffic', kind: 'entity', label: 'Входящий трафик', unit: '1 ГБ', price: 0 },
    ],
  },
];

const USAGE_SKU_RESULTS: SkuPriceResult[] = [
  'ai-model',
  'storage',
  'get-head',
  'list-post-put',
  'delete',
  'outgoing-traffic',
  'incoming-traffic',
].map(skuId => ({ skuId, skuAvailability: true, coveredByGrants: true }));

const CALCULATE_PRICE_DATA: CalculatePriceData = {
  skuResults: [{ skuId: 'agent', skuAvailability: true, coveredByGrants: true }, ...USAGE_SKU_RESULTS],
};

const Template: StoryFn<PriceSummaryProps> = args => {
  const [, setArgs] = useArgs<PriceSummaryProps>();

  const handlePeriodChanged = (period: PricePeriod) => {
    setArgs({ period });
  };

  return (
    <div style={{ width: 304, maxWidth: '100%' }}>
      <PriceSummary {...args} onPeriodChanged={handlePeriodChanged} />
    </div>
  );
};

const DEFAULT_ARGS: PriceSummaryProps = {
  value: 1.92,
  totalSumType: 'to',
  period: PricePeriod.Hour,
  freeTier: true,
  basePrice: 1.6,
  basePriceLabel: 'Конфигурация по умолчанию',
  priceChange: { value: 0.8 },
  discount: {
    discounts: [
      {
        label: 'ИЗЗИ Бизнес',
        value: 0.48,
        percent: 20,
        valueFormat: 'percent',
        tooltip: 'Скидка по условиям тарифа ИЗЗИ Бизнес',
      },
    ],
  },
  invoice: TIME_INVOICE,
  usageInvoice: USAGE_INVOICE,
  calculatePriceData: CALCULATE_PRICE_DATA,
  docsLink: { href: 'https://cloud.ru/documents/tariffs/index.html' },
  layoutType: 'desktop',
  onPeriodChanged: () => undefined,
};

type Story = StoryObj<PriceSummaryProps>;

function createInvoice(price?: number): InvoiceDetails[] {
  return [{ title: 'Вычислительные ресурсы', items: [{ kind: 'entity', label: 'Ресурс', quantity: 1, price }] }];
}

export const AiAgent: Story = { render: Template, args: DEFAULT_ARGS };

// The reference expands usage to show its content; the component default remains collapsed.
export const AiAgentExpanded: Story = { render: Template, args: { ...DEFAULT_ARGS, usageExpandedDefault: true } };

export const UsageOnly: Story = {
  render: Template,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Qchn4XCMqBobdzAVMIGY7F/Price-Summary?node-id=53817-18791',
    },
  },
  args: {
    period: PricePeriod.Month,
    freeTier: true,
    usageInvoice: USAGE_INVOICE.slice(1),
    calculatePriceData: { skuResults: USAGE_SKU_RESULTS.slice(1) },
    usageExpandedDefault: true,
    docsLink: DEFAULT_ARGS.docsLink,
    layoutType: 'desktop',
  },
};

export const Zero: Story = {
  render: Template,
  args: { period: PricePeriod.Month, value: 0, invoice: createInvoice(0) },
};

export const Range: Story = {
  render: Template,
  args: { period: PricePeriod.Month, value: { min: 99999.99, max: 999999.99 }, invoice: createInvoice() },
};

export const Scaling: Story = {
  render: Template,
  args: {
    period: PricePeriod.Month,
    value: 1000,
    totalSumType: 'from',
    scalingHint: 'При масштабировании стоимость увеличится',
    invoice: createInvoice(1000),
  },
};

export const CustomPeriods: Story = {
  render: Template,
  args: {
    period: PricePeriod.Minute,
    periodOptions: [PricePeriod.Minute, PricePeriod.Month],
    value: 0.03,
    invoice: createInvoice(0.03),
  },
};

export const MixedCoverage: Story = {
  render: Template,
  args: {
    ...DEFAULT_ARGS,
    freeTier: false,
    usageExpandedDefault: true,
    usageInvoice: [
      ...USAGE_INVOICE,
      {
        title: 'AI-модели',
        items: [
          {
            kind: 'entity',
            id: 'unavailable-usage',
            label: 'Недоступная AI-модель',
            parameters: [{ kind: 'parameter', label: 'Входящие токены', unit: '1 млн', price: 99 }],
          },
        ],
      },
    ],
    invoice: [
      {
        title: 'Вычислительные ресурсы',
        items: [
          {
            id: 'agent',
            kind: 'entity',
            label: 'Экземпляр агента',
            quantity: 1,
            price: 1.92,
            parameters: [{ kind: 'parameter', label: '1 vCPU' }],
          },
          {
            id: 'agent-alternative',
            kind: 'entity',
            label: 'Экземпляр агента другой конфигурации',
            quantity: 1,
            price: 2.4,
            parameters: [{ kind: 'parameter', label: '2 vCPU' }],
          },
          {
            kind: 'entity',
            id: 'unavailable',
            label: 'Недоступная конфигурация',
            price: 99,
            parameters: [
              { kind: 'parameter', label: '8 vCPU', price: 10 },
              { kind: 'parameter', label: '16 ГБ RAM' },
            ],
          },
        ],
      },
    ],
    calculatePriceData: {
      skuResults: [
        ...USAGE_SKU_RESULTS.map(result => ({ ...result, coveredByGrants: result.skuId !== 'ai-model' })),
        { skuId: 'agent', skuAvailability: true, coveredByGrants: true },
        { skuId: 'agent-alternative', skuAvailability: true, coveredByGrants: false },
        { skuId: 'unavailable', skuAvailability: false },
        { skuId: 'unavailable-usage', skuAvailability: false },
      ],
    },
  },
};

export const LongContent: Story = {
  render: Template,
  args: {
    ...DEFAULT_ARGS,
    invoice: Array.from({ length: 10 }, (_, index) => ({
      ...TIME_INVOICE[0],
      title: 'Вычислительные ресурсы ' + (index + 1),
    })),
    usageExpandedDefault: true,
  },
};

export const Loading: Story = { render: Template, args: { ...DEFAULT_ARGS, loading: true } };
export const DataError: Story = {
  render: Template,
  args: { ...DEFAULT_ARGS, dataError: true, onRetry: () => undefined },
};

const COVERED_RESOURCES: InvoiceDetails[] = [
  {
    title: 'Вычислительные ресурсы',
    items: [
      {
        kind: 'entity',
        id: 'vm',
        label: 'Виртуальная машина',
        quantity: 1,
        price: 300,
        parameters: [
          { kind: 'parameter', label: '2 vCPU', price: 100 },
          { kind: 'parameter', label: '4 ГБ RAM', price: 200 },
        ],
      },
    ],
  },
];

export const CoveredResources: Story = {
  render: Template,
  args: {
    period: PricePeriod.Month,
    value: 300,
    invoice: COVERED_RESOURCES,
    calculatePriceData: { skuResults: [{ skuId: 'vm', skuAvailability: true, coveredByGrants: true }] },
    layoutType: 'desktop',
  },
};

export const CoverageOverrides: Story = {
  render: Template,
  args: {
    period: PricePeriod.Month,
    value: 600,
    invoice: [
      {
        title: 'Ресурсы',
        items: [
          {
            kind: 'entity',
            label: 'Фиксированный ресурс',
            price: 100,
            coveredByGrants: true,
          },
          {
            kind: 'entity',
            id: 'uncovered-override',
            label: 'Расчёт отменяет покрытие',
            price: 200,
            coveredByGrants: true,
          },
          {
            kind: 'entity',
            id: 'covered-override',
            label: 'Расчёт добавляет покрытие',
            price: 300,
            coveredByGrants: false,
          },
        ],
      },
    ],
    calculatePriceData: {
      skuResults: [
        { skuId: 'uncovered-override', skuAvailability: true, coveredByGrants: false },
        { skuId: 'covered-override', skuAvailability: true, coveredByGrants: true },
      ],
    },
    layoutType: 'desktop',
  },
};

export const CoveredUsageResources: Story = {
  render: Template,
  args: {
    period: PricePeriod.Month,
    usageInvoice: [
      {
        title: 'AI-модели',
        items: [
          {
            kind: 'entity',
            id: 'model',
            label: 'Модель',
            parameters: [
              { kind: 'parameter', label: 'Входящие токены', unit: '1 млн', price: 96.22 },
              { kind: 'parameter', label: 'Исходящие токены', unit: '1 млн', price: 288.6 },
            ],
          },
        ],
      },
    ],
    calculatePriceData: { skuResults: [{ skuId: 'model', skuAvailability: true, coveredByGrants: true }] },
    usageExpandedDefault: true,
    layoutType: 'desktop',
  },
};

export const UnavailableUsageResource: Story = {
  render: Template,
  args: {
    period: PricePeriod.Month,
    usageInvoice: [
      {
        title: 'Хранение данных',
        items: [
          {
            kind: 'entity',
            id: 'unavailable-storage',
            label: 'Объектное хранилище',
            unit: '1 ГБ',
            price: 1.84,
            parameters: [{ kind: 'limit', label: 'Бесплатно до 15 ГБ в месяц' }],
          },
        ],
      },
    ],
    calculatePriceData: { skuResults: [{ skuId: 'unavailable-storage', skuAvailability: false }] },
    usageExpandedDefault: true,
    layoutType: 'desktop',
  },
};

export const Discounts: Story = {
  render: Template,
  args: {
    period: PricePeriod.Month,
    value: 4050,
    basePrice: 4500,
    invoice: [
      {
        title: 'Вычислительные ресурсы',
        items: [
          {
            id: 'discount-vm',
            kind: 'entity',
            label: 'Виртуальная машина',
            quantity: 1,
            price: 2700,
            discount: {
              label: 'Скидка на ресурс',
              value: 300,
              percent: 10,
              tooltip: 'Скидка уже учтена в цене ресурса',
            },
            parameters: [
              { kind: 'parameter', label: '2 vCPU', price: 1800 },
              { kind: 'parameter', label: '4 ГБ RAM', price: 900 },
            ],
          },
          {
            id: 'discount-disk',
            kind: 'entity',
            label: 'Диск',
            quantity: 1,
            price: 900,
            parameters: [
              {
                kind: 'parameter',
                label: 'SSD, 100 ГБ',
                price: 900,
                discount: {
                  label: 'Скидка на параметр',
                  value: 100,
                  percent: 10,
                  tooltip: 'Скидка уже учтена в цене параметра',
                },
              },
            ],
          },
          {
            id: 'discount-backup',
            kind: 'entity',
            label: 'Резервное копирование',
            quantity: 1,
            price: 450,
            parameters: [
              { kind: 'parameter', label: 'Хранение резервных копий', price: 450 },
              { kind: 'discount', discount: { label: 'Скидка по акции', value: 50, percent: 10 } },
            ],
          },
        ],
      },
    ],
    calculatePriceData: {
      skuResults: ['discount-vm', 'discount-disk', 'discount-backup'].map(skuId => ({
        skuId,
        skuAvailability: true,
        coveredByGrants: true,
      })),
    },
    layoutType: 'desktop',
  },
};

export const LoadingWithoutInvoice: Story = {
  render: Template,
  args: { period: PricePeriod.Month, loading: true, layoutType: 'desktop' },
};

export const DataErrorWithoutInvoice: Story = {
  render: Template,
  args: { period: PricePeriod.Month, dataError: true, onRetry: () => undefined, layoutType: 'desktop' },
};
