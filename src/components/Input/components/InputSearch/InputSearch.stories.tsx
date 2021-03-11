import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Input } from 'components/Input';

import { InputSearch, IInputSearchProps } from './InputSearch';

export default {
  title: 'Components/Input',
  component: Input,
} as Meta;

const Template: Story<IInputSearchProps> = ({ ...args }) => {
  const [value, setValue] = useState<string | undefined>();

  return <InputSearch value={value} onChange={setValue} {...args} />;
};

export const inputSearch = Template.bind({});
inputSearch.args = {};
inputSearch.parameters = {};
