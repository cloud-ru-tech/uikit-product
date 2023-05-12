import { Meta } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import * as Icons from '../src/components/services-icons';
import { getTemplate } from './helpers/StoryTemplate';

export default {
  title: 'Components/Icons/Services',
} as Meta;

const Template = getTemplate(Icons);

export const services = Template.bind({});

services.args = {
  size: 20,
};
services.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=212%3A350',
  },
  badges: [BADGE.STABLE],
};
services.argTypes = {
  size: {
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
