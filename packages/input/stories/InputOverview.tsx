import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InputOverview, InputOverviewProps } from '../src';

export default {
  title: 'Components/Input/Overview',
  component: InputOverview,
} as Meta;

const Template: StoryFn<InputOverviewProps> = args => {
  const [value, setValue] = useState<string>();

  return <InputOverview {...args} value={value} onChange={setValue} />;
};

export const overview = Template.bind({});
overview.args = {
  label: 'Label',
  labelTooltip: { content: 'Label tooltip content' },
  hint: 'Hint',
  placeholder: 'Placeholder',
  moreButtonTooltipText: 'More button tooltip text',
};
overview.argTypes = {};
overview.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=1106%3A23348',
  },
};
