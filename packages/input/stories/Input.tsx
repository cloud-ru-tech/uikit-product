import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Input, InputProps } from '../src';

export default {
  title: 'Not stable/Input/Input',
  component: Input,
  decorators: [addReadme, withDesign],
} as Meta;

const Template: Story<InputProps> = ({ ...args }) => {
  const [value, setValue] = useState<string | undefined>();

  return (
    <Input
      {...args}
      value={value}
      onChange={(e): void => {
        setValue(e.target.value);
      }}
    />
  );
};

export const input = Template.bind({});
input.args = {};
input.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
input.argTypes = {
  placeholder: {
    defaultValue: 'Пример: Project1-bucket106',
  },
};
