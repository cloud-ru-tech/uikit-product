import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Input } from 'components/Input';
import { InputProps } from 'components/Input/helpers/types';

import { InputCopy } from './InputCopy';

export default {
  title: 'Example/Input',
  component: Input,
} as Meta;

// NOW: split to map
const Template: Story<InputProps> = () => (
  <>
    <InputCopy value='docker pull 10.162.118.128/ library/nginx:latestsdsd' />
    <br />
    <InputCopy
      label='Image'
      value='docker pull 10.162.118.128/ library/nginx:latestsdsd'
    />
    <br />
    <InputCopy
      label='Image'
      labelMinWidth='40px'
      value='docker pull 10.162.118.128/ library/nginx:latestsdsd'
    />
    <InputCopy
      label='URL'
      labelMinWidth='40px'
      value='docker pull 10.162.118.128/ library/nginx:latestsdsd'
    />
    <br />
    <InputCopy
      label='Password'
      labelMinWidth='40px'
      value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      security
    />
  </>
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
