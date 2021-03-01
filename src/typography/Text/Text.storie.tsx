import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Text_1, Text_2, Text_2_Link, Text_3, Text_4, TTextProps } from './index';
import { COLORS, COLORS_GENERAL } from 'theme/color/vars';


export default {
  title: 'Typography/Text',
  component: Text_1,
} as Meta;

const Template: Story<TTextProps & { children: string }> = args => {
  return (
    <div>
      <Text_1 {...args}>{args.children} (Text_1)</Text_1>
      <Text_2 {...args}>{args.children} (Text_2)</Text_2>
      <Text_2_Link {...args}>{args.children} (Text_2_Link)</Text_2_Link>
      <Text_3 {...args}>{args.children} (Text_3)</Text_3>
      <Text_4 {...args}>{args.children} (Text_4)</Text_4>
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
