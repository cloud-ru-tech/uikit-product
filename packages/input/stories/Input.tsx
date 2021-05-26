import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { IInputProps, Input } from '../src';

export default {
  title: 'Components/Input/Input',
  component: Input,
} as Meta;

const Template: Story<IInputProps> = ({ ...args }) => {
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
input.parameters = {};
input.argTypes = {
  placeholder: {
    defaultValue: 'Пример: Project1-bucket106',
  },
};
