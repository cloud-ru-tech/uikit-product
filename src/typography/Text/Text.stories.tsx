import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { COLORS_GENERAL } from 'theme/color/vars';
import { Text1, Text2, Text2Link, Text3, Text4, TTextProps } from './index';

export default {
  title: 'Typography/Text',
  component: Text1,
} as Meta;

const Template: Story<TTextProps & { children: string }> = args => (
  <div>
    <Text1 {...args}>{args.children} (Text1)</Text1>
    <Text2 {...args}>{args.children} (Text2)</Text2>
    <Text2Link {...args}>{args.children} (Text2Link)</Text2Link>
    <Text3 {...args}>{args.children} (Text3)</Text3>
    <Text4 {...args}>{args.children} (Text4)</Text4>
  </div>
);

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
