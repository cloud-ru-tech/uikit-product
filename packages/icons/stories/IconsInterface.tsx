import { Meta } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import * as Icons from '../src/components/interface-icons';
import { getTemplate } from './helpers/StoryTemplate';

export default {
  title: 'Components/Icons/Interfaces',
} as Meta;

const Template = getTemplate(Icons);

export const interfaces = Template.bind({});

interfaces.args = {};
interfaces.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/TEMP-DESIGN-SYSTEM?node-id=212%3A350',
  },
};
interfaces.argTypes = {
  size: {
    defaultValue: 20,
    name: '[Stories]: Size of icons',
    control: {
      type: 'range',
      min: 10,
      max: 200,
    },
  },
  fill: {
    name: '[Stories]: Color of icons',
    control: {
      type: 'color',
    },
  },
};
