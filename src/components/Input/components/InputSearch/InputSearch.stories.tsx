import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Input } from 'components/Input';

import { InputSearch, IInputSearchProps } from './InputSearch';

export default {
  title: 'Components/Input/InputSearch',
  component: Input,
} as Meta;

const Template: Story<IInputSearchProps> = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <div style={{ backgroundColor: '#ededed', padding: 10 }}>
      <InputSearch value={value} onChange={setValue} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {};
