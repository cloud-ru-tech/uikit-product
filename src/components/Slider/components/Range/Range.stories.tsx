import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Range, TRangeProps } from './Range';

export default {
  title: 'Components/Slider/Range',
  component: Range,
} as Meta;

const Template: Story<TRangeProps> = () => (
  <Range
    value={[0, 5]}
    marks={{
      0: '0',
      20: '20',
      40: '40',
      60: '60',
      80: '80',
      100: '100',
    }}
    min={0}
    max={100}
  />
);

export const Default = Template.bind({});

Default.args = {};
Default.parameters = {};
