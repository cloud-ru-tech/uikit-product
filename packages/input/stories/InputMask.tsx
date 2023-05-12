import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InputMask, InputMaskProps } from '../src';

export default {
  title: 'Components/Input/Mask',
  component: InputMask,
} as Meta;

const Template: StoryFn<InputMaskProps> = args => {
  const [value, setValue] = useState<string>();

  return <InputMask {...args} value={value} onChange={setValue} />;
};

export const mask = Template.bind({});
mask.args = {
  label: 'Label',
  labelTooltip: { content: 'Label tooltip content' },
  hint: 'Hint',
  mask: InputMask.masks.Passport,
};
mask.argTypes = {};
mask.parameters = {
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
