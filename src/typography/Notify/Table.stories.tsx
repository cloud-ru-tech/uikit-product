import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { NotifyText, TNotifyProps } from './index';
import { COLORS_GENERAL } from 'theme/color/vars';

export default {
  title: 'Typography/Table',
  component: NotifyText,
} as Meta;

const Template: Story<TNotifyProps & { children: string }> = args => {
  return (
    <div>
      <NotifyText {...args}>{args.children} (NotifyText)</NotifyText>
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
