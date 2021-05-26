import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { ISliderProps, Slider } from '../src';

export default {
  title: 'Components/Slider',
  component: Slider,
} as Meta;

const Template: Story<ISliderProps> = () => {
  const [value, setValue] = useState<number>();

  return (
    <Slider
      value={value}
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
      onChange={val => setValue(val)}
    />
  );
};

export const slider = Template.bind({});

slider.args = {};

slider.argTypes = {};
