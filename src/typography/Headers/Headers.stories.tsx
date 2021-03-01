import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { H1, H2, H3, H3Semibold, H4, H5, TFontProps } from './index';
import { COLORS, COLORS_GENERAL } from 'theme/color/vars';

export default {
  title: 'Typography/Headers',
  component: H1,
} as Meta;

const Template: Story<TFontProps & { children: string }> = args => {
  return (
    <div>
      <H1 {...args}>{args.children} (H1)</H1>
      <H2 {...args}>{args.children} (H2)</H2>
      <H3 {...args}>{args.children} (H3)</H3>
      <H3Semibold {...args}>{args.children} (H3Semibold)</H3Semibold>
      <H4 {...args}>{args.children} (H4)</H4>
      <H5 {...args}>{args.children} (H5)</H5>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  color: `var(${COLORS_GENERAL.TEXT})`,
  children: 'Пример',
};

Default.argTypes = {
  color: {
    control: {
      type: 'color',
    },
  },
  children: {
    control: {
      type: 'text',
    },
  },
};
