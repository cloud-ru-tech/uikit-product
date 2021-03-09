import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Slider, TSliderProps } from './Slider';

export default {
  title: 'Components/Slider/Default',
  component: Slider,
} as Meta;

const Template: Story<TSliderProps> = () => (
  <Slider
    marks={{
      1: '1',
      2: '2',
      3: '3',
      5: '5',
      10: '10',
      16: '16',
    }}
    min={1}
    max={16}
  />
);

export const Default = Template.bind({});

Default.args = {};
Default.parameters = {};
