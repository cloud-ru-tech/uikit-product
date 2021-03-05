import { Story, Meta } from '@storybook/react/types-6-0';

import { COLORS_GENERAL } from 'theme/color/vars';

import { NotifyText, TNotifyProps } from './index';

export default {
  title: 'Typography/Notify',
  component: NotifyText,
} as Meta;

const Template: Story<TNotifyProps & { children: string }> = args => (
  <div>
    <NotifyText {...args}>{args.children} (NotifyText)</NotifyText>
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
