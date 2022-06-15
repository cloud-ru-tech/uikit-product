import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InputSlider } from '../src';
import { InputSliderProps } from '../src/components/types';

export default {
  title: 'Components/Input Slider/Input Slider',
  component: InputSlider,
} as Meta;

const Template: Story<InputSliderProps> = ({ ...args }) => {
  const [value, setValue] = useState(args.value || 10);

  const valueHandler = (v: string | number) => setValue(Number(v));

  return <InputSlider {...args} value={value} onChange={valueHandler} />;
};

export const inputSlider = Template.bind({});
inputSlider.args = {
  postfix: '₽',
  label: 'Label',
  labelTooltip: {
    content: 'Доступны в шторке сторибука',
  },
  min: 0,
  max: 100,
  marks: [20, 40, 60, 80],
  optional: true,
  hint: 'Текст подсказки',
};
inputSlider.argTypes = {};
inputSlider.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=3594%3A47552',
  },
};
