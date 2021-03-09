import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Input } from 'components/Input';
import { InputProps } from 'components/Input/helpers/types';

import { InputSecurity } from './InputSecurity';

export default {
  title: 'Components/Input/InputSecurity',
  component: Input,
} as Meta;

const Template: Story<InputProps> = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <InputSecurity
        value={value}
        onChange={(e): void => {
          setValue(e.target.value);
        }}
      />
      <br />
      <InputSecurity
        value={value}
        allowClear
        onChange={(e): void => {
          setValue(e.target.value);
        }}
      />
      <br />
      <InputSecurity
        value={value}
        allowClear
        allowCopy
        onChange={(e): void => {
          setValue(e.target.value);
        }}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
