import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TableText, TTableProps } from './index';
import { COLORS_GENERAL } from 'theme/color/vars';

export default {
  title: 'Typography/Table',
  component: TableText,
} as Meta;

const Template: Story<TTableProps & { children: string }> = args => {
  return (
    <div>
      <TableText {...args}>{args.children} (TableText)</TableText>
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
