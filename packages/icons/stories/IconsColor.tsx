import { Meta } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import * as Icons from '../src/components/color-icons';
import { getTemplate } from '../storyHelpers/StoryTemplate';

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
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/TEMP-DESIGN-SYSTEM?node-id=212%3A350',
  },
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
