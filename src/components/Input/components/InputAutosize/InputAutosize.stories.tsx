import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Input } from 'components/Input';
import { InputProps } from 'components/Input/helpers/types';

import { InputAutosize } from './InputAutosize';

export default {
  title: 'Example/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = () => {
  const [inputValue, setValue] = useState<string>();

  return (
    <InputAutosize
      name='form-field-name'
      value={inputValue}
      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
