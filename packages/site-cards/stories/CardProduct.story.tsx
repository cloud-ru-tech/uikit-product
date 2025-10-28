import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardProduct, CardProductProps } from '../src/components';
import { COMMON_CARD_STORY_ARG_TYPES, COMMON_CARD_STORY_ARGS, CommonCardStoryProps, useStoryIcon } from './helpers';

const meta: Meta = {
  title: 'Site/Cards/Card Product',
  component: CardProduct,
};

const tagsValues: Record<number, CardProductProps['tags']> = {
  0: undefined,
  1: [{ text: 'free', appearance: 'blue' }],
  2: [
    { text: 'free', appearance: 'blue' },
    { text: 'available', appearance: 'neutral' },
  ],
};

type StoryProps = CardProductProps & CommonCardStoryProps;

const Template: StoryFn<StoryProps> = ({ iconMode, storyIcon, imgSrc, showIcon, ...args }) => {
  const cardIcon = useStoryIcon({ imgSrc, storyIcon, iconMode });

  return <CardProduct {...args} icon={showIcon ? cardIcon : undefined} showIcon={showIcon} onClick={undefined} />;
};

export const cardProduct: StoryObj<StoryProps> = {
  render: Template,
  args: {
    title: 'Title',
    description: 'Description',
    href: '#',
    'data-test-id': 'card-product',
    layoutType: LAYOUT_TYPE.Desktop,
    tags: tagsValues['2'],
    disabled: false,
    showIcon: true,
    showBadge: false,
    ...COMMON_CARD_STORY_ARGS,
  },
  argTypes: {
    ...COMMON_CARD_STORY_ARG_TYPES,
    showIcon: {
      name: '[Stories]: Show icon',
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'Показывать иконку, когда true',
        },
      },
    },
    showBadge: {
      name: '[Stories]: With badge',
      control: {
        type: 'boolean',
      },
    },
    className: {
      control: false,
    },
    tags: {
      name: '[Stories]: Show tags',
      options: Object.keys(tagsValues),
      mapping: tagsValues,
      control: {
        type: 'select',
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=3553-153211&t=8V6c2SdM6ocDFly6-0',
    },
  },
};

export default meta;
