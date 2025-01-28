import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { PricePeriod } from '@sbercloud/uikit-product-price-summary';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PriceSummary, PriceSummaryProps } from '../src/components';

const meta: Meta = {
  title: 'Console/Price Summary/Price Summary',
  component: PriceSummary,
};
export default meta;

const Template: StoryFn<PriceSummaryProps> = ({ ...args }) => {
  const [_, setArgs] = useArgs();

  return (
    <div style={{ maxWidth: 304 }}>
      <PriceSummary {...args} onPeriodChanged={period => setArgs({ ...args, period })} />
    </div>
  );
};

export const priceSummary: StoryObj<PriceSummaryProps> = {
  render: Template,
  args: {
    value: 9999999.99,
    hint: 'Стоимость зависит от потребления',
    period: PricePeriod.Month,
    periodOptions: [PricePeriod.Year, PricePeriod.Month, PricePeriod.Day, PricePeriod.Hour, PricePeriod.Minute],
    promoBadge: {
      text: 'Promo Label',
    },
    discount: {
      price: 9999999.99,
      discounts: [
        { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
        { value: -1000, percent: -9, tooltip: 'Скидка -9%' },
      ],
    },
    invoice: [
      {
        title: 'Label detalization list',
        quantity: 5,
        price: 9999999.99,
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
            bottomDivider: true,
          },
          {
            label: 'Label',
            quantity: 1,
            price: 9999999.99,
            discount: { value: 1000, percent: 9, tooltip: 'Скидка -9%' },
            primary: true,
          },
          {
            label: 'Label',
            quantity: 1,
            price: 9999999.99,
            primary: true,
            topDivider: true,
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
    ],
    docsLink: {
      href: 'https://cloud.ru/documents/tariffs/index.html',
    },
    layoutType: 'desktop',
  },
  argTypes: {},
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
