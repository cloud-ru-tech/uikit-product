import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InputSecurity, InputSecurityProps } from '../src';

const meta: Meta = {
  title: 'Components/Input/Security',
  component: InputSecurity,
};
export default meta;

function Template(args: InputSecurityProps) {
  const [value, setValue] = useState<string>();

  return <InputSecurity {...args} value={value} onChange={setValue} />;
}

export const security: StoryFn<InputSecurityProps> = Template.bind({});
security.args = {
  label: 'Label',
  labelTooltip: { content: 'Label tooltip content' },
  hint: 'Hint',
  placeholder: 'Placeholder',
};
security.argTypes = {};
security.parameters = {
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
