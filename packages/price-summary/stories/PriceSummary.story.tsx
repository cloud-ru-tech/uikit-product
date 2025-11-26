import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import { PricePeriod } from '@cloud-ru/uikit-product-price-summary';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PriceSummary, PriceSummaryProps } from '../src/components';
import { InvoiceDetails } from '../src/types';

const meta: Meta = {
  title: 'Console/Price Summary/Price Summary',
  component: PriceSummary,
};
export default meta;

type StoryProps = PriceSummaryProps & {
  showSingleGroup: boolean;
  showCoveredByGrantLabel: boolean;
};

const INVOICE_SAMPLE: InvoiceDetails[] = [
  {
    title: 'Label',
    quantity: 5,
    price: 9999999.99,
    items: [
      {
        label: 'Label',
        labelTooltip: 'label tooltip',
        quantity: 1,
        price: 9999999.99,
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
        primary: true,
        coveredByGrant: false,
      },
      {
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
        primary: false,
        bottomDivider: true,
      },
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
        primary: true,
        coveredByGrant: true,
      },
      {
        label: 'Label',
        labelMaxLines: 1,
        quantity: 1,
        price: 9999999.99,
        primary: true,
        coveredByGrant: true,
        topDivider: true,
      },
      {
        label: 'Text describing the characteristic text describing the characteristic',
        labelMaxLines: 1,
        primary: false,
      },
      {
        primary: true,
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
      },
      {
        label: 'Label',
        labelMaxLines: 1,
        quantity: 1,
        price: 9999999.99,
        primary: true,
        coveredByGrant: false,
      },
    ],
  },
  {
    title: 'Covered by grant block',
    quantity: 5,
    price: 9999999.99,
    items: [
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        primary: true,
        coveredByGrant: true,
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
      },
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        primary: true,
        coveredByGrant: true,
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
      },
    ],
  },
  {
    title: 'Not covered by grant block',
    quantity: 5,
    price: 9999999.99,
    items: [
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        primary: true,
        coveredByGrant: false,
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
      },
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        primary: true,
        coveredByGrant: false,
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
      },
    ],
  },
  {
    items: [
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
      },
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
      },
      {
        label: 'Label',
        quantity: 1,
        price: 9999999.99,
        primary: false,
      },
    ],
  },
];

const Template: StoryFn<StoryProps> = ({ showSingleGroup, showCoveredByGrantLabel, ...args }) => {
  const [_, setArgs] = useArgs();

  const invoice = useMemo(() => {
    let _invoice = INVOICE_SAMPLE;

    if (!showCoveredByGrantLabel) {
      _invoice = _invoice.map(invoice => ({
        ...invoice,
        items: invoice.items.map(item => ({
          ...item,
          coveredByGrant: undefined,
        })),
      }));
    }

    if (!showSingleGroup) {
      return _invoice;
    }

    return [_invoice[0]];
  }, [showSingleGroup, showCoveredByGrantLabel]);

  return (
    <div style={{ maxWidth: 304 }}>
      <PriceSummary {...args} onPeriodChanged={period => setArgs({ ...args, period })} invoice={invoice} />
    </div>
  );
};

export const priceSummary: StoryObj<StoryProps> = {
  render: Template,
  args: {
    showSingleGroup: false,
    value: 9999999.99,
    totalSumType: 'equal',
    hint: 'Стоимость зависит от потребления',
    period: PricePeriod.Month,
    periodOptions: [PricePeriod.Year, PricePeriod.Month, PricePeriod.Day, PricePeriod.Hour, PricePeriod.Minute],
    promoBadge: {
      text: 'Promo Label',
    },
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
    showHintLink: true,
    showCoveredByGrantLabel: true,
  },
  argTypes: {
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
