import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';

import { PROMO_TYPE } from '../../site-tag/src/components/TagPredefined/helpers';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardMarketplace, CardMarketplaceProps } from '../src';
import logoSrc from './assets/LogoPlaceholder.png';

const meta: Meta = {
  title: 'Site/Cards/Card Marketplace',
  component: CardMarketplace,
};

type StoryProps = CardMarketplaceProps;

const Template: StoryFn<StoryProps> = args => <CardMarketplace {...args} />;

const tagPromoValues = Object.entries(PROMO_TYPE).reduce(
  (res, [key, value]) => {
    res[key] = { type: value };
    return res;
  },
  {} as Record<string, CardMarketplaceProps['tag']>,
);

export const cardMarketplace: StoryObj<StoryProps> = {
  render: Template,
  args: {
    title: 'Title',
    description: 'Description',
    tag: tagPromoValues.Free,
    href: '#',
    target: '_blank',
    logo: {
      src: logoSrc,
      alt: 'logo-placeholder',
    },
    'data-test-id': 'card-marketplace',
    layoutType: LAYOUT_TYPE.Desktop,
    disabled: false,
  },
  argTypes: {
    tag: {
      control: 'select',
      options: ['Unset', ...Object.keys(PROMO_TYPE)],
      mapping: {
        Unset: undefined,
        ...tagPromoValues,
      },
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
    },
    className: {
      control: false,
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=2880-14451',
    },
  },
};

export default meta;
