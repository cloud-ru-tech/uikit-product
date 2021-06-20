import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ISliderProps, Slider } from '../src';

export default {
  title: 'Not stable/Slider',
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

slider.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
