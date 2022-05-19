import { Meta } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import * as Icons from '../src/components/platform-icons';
import { getTemplate } from './helpers/StoryTemplate';

export default {
  title: 'Components/Icons/Platform',
} as Meta;

const Template = getTemplate(Icons);

export const platform = Template.bind({});

platform.args = {};
platform.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/TEMP-DESIGN-SYSTEM?node-id=212%3A350',
  },
  badges: [BADGE.STABLE],
};
platform.argTypes = {
  size: {
    defaultValue: 180,
    name: '[Stories]: Size of icons',
    control: {
      type: 'range',
      min: 10,
      max: 200,
    },
  },
};
