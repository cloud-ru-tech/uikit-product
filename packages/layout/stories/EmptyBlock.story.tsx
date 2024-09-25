import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { JSXElementConstructor } from 'react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { IconPredefinedProps } from '@snack-uikit/icon-predefined';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { EmptyBlock, EmptyBlockProps } from '../src';
import { ICONS } from './constants';

const meta: Meta = {
  title: 'Snack Uikit/Layout/EmptyBlock',
  component: EmptyBlock,
};
export default meta;

const BUTTON_PROPS = { label: 'Label text', icon: <PlaceholderSVG /> };

type StoryProps = Omit<EmptyBlockProps, 'icon'> & {
  icon: {
    decor: boolean;
    appearance: IconPredefinedProps['appearance'];
  };
  showIcon: boolean;
  chosenIcon: JSXElementConstructor<{ size?: number; className?: string }>;
};

const Template: StoryFn<StoryProps> = ({ chosenIcon, icon, showIcon, ...args }: StoryProps) => (
  <EmptyBlock
    {...args}
    icon={showIcon ? { ...icon, icon: chosenIcon } : undefined}
    primaryButton={BUTTON_PROPS}
    secondaryButton={BUTTON_PROPS}
  />
);

export const emptyBlock: StoryObj<StoryProps> = {
  render: Template,

  args: {
    title: 'Title',
    description: 'Description',
    icon: {
      decor: true,
      appearance: 'primary',
    },
    showIcon: true,
    chosenIcon: PlaceholderSVG,
  },

  argTypes: {
    showIcon: {
      name: '[Stories]: Show icon',
    },
    chosenIcon: {
      name: '[Stories]: Choose icon',
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: 'select',
      },
      if: {
        arg: 'showIcon',
        eq: true,
      },
    },
    description: {
      type: 'string',
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
      url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=632%3A4876&mode=design&t=ofuRBtivGxvlUbmO-1',
    },
  },
};
