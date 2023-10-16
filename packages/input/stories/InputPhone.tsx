import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InputPhone, InputPhoneProps } from '../src';

const meta: Meta = {
  title: 'Components/Input/Phone',
  component: InputPhone,
};
export default meta;

function Template(args: InputPhoneProps) {
  const [value, setValue] = useState<string>();

  return <InputPhone {...args} value={value} onChange={setValue} />;
}

export const phone: StoryFn<InputPhoneProps> = Template.bind({});
phone.args = {
  label: 'Label',
  labelTooltip: { content: 'Label tooltip content' },
  hint: 'Hint',
};
phone.argTypes = {};
phone.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=1106%3A23348',
  },
};
