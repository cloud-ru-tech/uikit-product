import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InputCommon, InputCommonProps } from '../src';

export default {
  title: 'Components/Input/Common',
  component: InputCommon,
} as Meta;

const Template: StoryFn<InputCommonProps> = args => {
  const [value, setValue] = useState<string>();

  return <InputCommon {...args} value={value} onChange={setValue} />;
};

export const common = Template.bind({});
common.args = {
  label: 'Label',
  labelTooltip: { content: 'Label tooltip content' },
  hint: 'Hint',
  placeholder: 'Placeholder',
};
common.argTypes = {};
common.parameters = {
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
