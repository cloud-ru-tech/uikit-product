import { Meta, StoryFn } from '@storybook/react';

import { PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InfoBlockPredefined, InfoBlockPredefinedProps } from '../src';
import { BUTTON_PROPS } from './constants';

const meta: Meta = {
  title: 'Snack Uikit/Info Block Predefined',
  component: InfoBlockPredefined,
};
export default meta;

type StoryProps = Omit<InfoBlockPredefinedProps, 'icon'> & {
  showIcon: boolean;
  showPrimaryButton: boolean;
  showSecondaryButton: boolean;
  showTertiaryButton: boolean;
};

function Template({ showIcon, showPrimaryButton, showSecondaryButton, showTertiaryButton, ...args }: StoryProps) {
  return (
    <InfoBlockPredefined
      icon={showIcon ? { decor: true, appearance: 'primary', icon: PlaceholderSVG } : undefined}
      {...args}
      primaryButton={showPrimaryButton ? BUTTON_PROPS : undefined}
      secondaryButton={showSecondaryButton ? BUTTON_PROPS : undefined}
      tertiaryButton={showTertiaryButton ? BUTTON_PROPS : undefined}
    />
  );
}

export const infoBlockPredefined: StoryFn<StoryProps> = Template.bind({});

infoBlockPredefined.args = {
  title: 'Title',
  description: 'Description',
  showIcon: true,
  showPrimaryButton: true,
  showSecondaryButton: true,
  showTertiaryButton: true,
  primaryButton: BUTTON_PROPS,
  secondaryButton: BUTTON_PROPS,
  tertiaryButton: BUTTON_PROPS,
};

infoBlockPredefined.argTypes = {
  showIcon: {
    name: '[Stories]: Show icon',
  },
  showPrimaryButton: {
    name: '[Stories]: Show PrimaryButton',
  },
  showSecondaryButton: {
    name: '[Stories]: Show SecondaryButton',
  },
  showTertiaryButton: {
    name: '[Stories]: Show TertiaryButton',
  },

  description: {
    type: 'string',
  },

  primaryButton: {
    table: {
      disable: true,
    },
  },

  secondaryButton: {
    table: {
      disable: true,
    },
  },

  tertiaryButton: {
    table: {
      disable: true,
    },
  },
};

infoBlockPredefined.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/Product-components?m=auto&node-id=866-18464&t=h1f5k9lWP7q42AaE-1',
  },
};
