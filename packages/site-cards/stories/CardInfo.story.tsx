import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardInfo, CardInfoProps } from '../src';
import { COMMON_CARD_STORY_ARG_TYPES, COMMON_CARD_STORY_ARGS, CommonCardStoryProps, useStoryIcon } from './helpers';

const meta: Meta = {
  title: 'Site/Cards/Card Info',
  component: CardInfo,
};

type StoryProps = CardInfoProps & CommonCardStoryProps;

const Template: StoryFn<StoryProps> = ({ iconMode, storyIcon, imgSrc, ...args }) => {
  const cardIcon = useStoryIcon({ imgSrc, storyIcon, iconMode });

  return <CardInfo {...args} icon={cardIcon} onClick={undefined} />;
};

const TAGS: Record<string, NonNullable<CardInfoProps['tag']>> = {
  tagCustom: {
    text: 'CustomPromoTag',
    appearance: 'orange',
  },
  tagPredefinedPromo: {
    variant: 'promo',
    type: 'free',
  },
  tagPredefinedFormat: {
    variant: 'format',
    type: 'online',
  },
};

export const cardInfo: StoryObj<StoryProps> = {
  render: Template,
  args: {
    title: 'Title',
    description: 'description',
    tag: TAGS.tagPredefinedPromo,
    href: '#',
    target: '_blank',
    'data-test-id': 'card-info',
    layoutType: LAYOUT_TYPE.Desktop,
    ...COMMON_CARD_STORY_ARGS,
  },
  argTypes: {
    ...COMMON_CARD_STORY_ARG_TYPES,
    tag: {
      control: 'select',
      options: ['Unset', ...Object.keys(TAGS)],
      mapping: {
        Unset: undefined,
        ...TAGS,
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=2098-5456&m=dev',
    },
  },
};

export default meta;
