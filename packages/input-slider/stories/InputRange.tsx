import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InputRange } from '../src';
import { InputRangeProps } from '../src/components/types';

export default {
  title: 'Components/Input Slider/Input Range',
  component: InputRange,
} as Meta;

const Template: Story<InputRangeProps> = ({ ...args }) => {
  const [value, setValue] = useState<[number, number]>(args.value || [20, 80]);

  const valueHandler = (v: [number, number]) => setValue(v);

  return <InputRange {...args} value={value} onChange={valueHandler} />;
};

export const inputRange = Template.bind({});
inputRange.args = {
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
inputRange.argTypes = {};
inputRange.parameters = {
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
