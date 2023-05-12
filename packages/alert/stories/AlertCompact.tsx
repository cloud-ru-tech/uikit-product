import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AlertCompact, AlertCompactProps } from '../src';

export default {
  title: 'Components/Alert/Alert Compact',
  component: AlertCompact,
} as Meta;

const Template: StoryFn<AlertCompactProps> = ({ ...args }) => <AlertCompact {...args} />;

export const alertCompact = Template.bind({});
alertCompact.args = {
  description: 'Description',
  type: AlertCompact.types.Default,
  linkProps: {
    text: 'Link',
    showSuffixIcon: true,
  },
};
alertCompact.argTypes = {
  description: {
    type: 'string',
  },
};
alertCompact.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=959%3A15815',
  },
  badges: [BADGE.STABLE],
};
