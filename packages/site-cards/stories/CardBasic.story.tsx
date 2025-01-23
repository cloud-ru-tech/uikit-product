import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardBasic, CardBasicProps } from '../src';
import { COMMON_CARD_STORY_ARG_TYPES, COMMON_CARD_STORY_ARGS, CommonCardStoryProps, useStoryIcon } from './helpers';

const meta: Meta = {
  title: 'Site/Cards/Card Basic',
  component: CardBasic,
};

export default meta;

type StoryProps = CardBasicProps & CommonCardStoryProps;

const Template: StoryFn<StoryProps> = ({ iconMode, storyIcon, imgSrc, ...args }) => {
  const cardIcon = useStoryIcon({ iconMode, storyIcon, imgSrc });

  return <CardBasic {...args} icon={cardIcon} />;
};

export const cardBasic: StoryObj<StoryProps> = {
  render: Template,
  args: {
    title: 'Title',
    description: 'description',
    layoutType: LAYOUT_TYPE.Desktop,
    'data-test-id': 'card-basic',
    ...COMMON_CARD_STORY_ARGS,
  },
  argTypes: {
    ...COMMON_CARD_STORY_ARG_TYPES,
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=310-266&p=f&m=dev',
    },
  },
};
