/* eslint-disable no-console */
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Input, InputProps } from '../src';

export default {
  title: 'Not stable/Input/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps & { showOpenDialog: boolean }> = ({ ...args }) => {
  const [value, setValue] = useState<string | undefined>();

  return (
    <Input
      {...args}
      value={value}
      onChange={(e): void => {
        setValue(e.target.value);
      }}
      onOpenDialog={args.showOpenDialog ? () => console.log('click onOpenDialog') : undefined}
    />
  );
};

export const input = Template.bind({});
input.args = {
  allowCopy: false,
  allowClear: false,
  error: false,
};
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
  showOpenDialog: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  placeholder: {
    control: {
      type: 'text',
    },
    defaultValue: 'Пример: Project1-bucket106',
  },
};
