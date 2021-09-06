import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Meta } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import * as Icons from '../src/components/color-icons';
import { getTemplate } from './helpers/StoryTemplate';

export default {
  title: 'Components/Icons/Color',
} as Meta;

const Template = getTemplate(Icons);

export const color = Template.bind({});

color.args = {};
color.parameters = {
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
color.argTypes = {
  size: {
    defaultValue: 50,
    name: '[Stories]: Size of icons',
    control: {
      type: 'range',
      min: 10,
      max: 200,
    },
  },
};
