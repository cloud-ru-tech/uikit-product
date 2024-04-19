import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import * as Icons from '../src/components/illustrations-mlspace-icons';
import { getTemplate } from './helpers/StoryTemplate';

const meta: Meta = {
  title: 'Snack Uikit/Icons/Illustrations/ML Space',
};
export default meta;

const Template = getTemplate(Icons);

export const MLSpace: StoryObj = Template.bind({});

MLSpace.args = {
  size: 24,
};
MLSpace.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/cYan1ISO0i79QLY0oKP12e/Service-illustrations?type=design&node-id=0%3A1&mode=design&t=TU3hLAvmjEvKj1rX-1',
  },
  badges: [BADGE.STABLE],
};
MLSpace.argTypes = {
  size: {
    name: '[Stories]: Size of icons',
    control: {
      type: 'range',
      min: 10,
      max: 200,
    },
  },
};
