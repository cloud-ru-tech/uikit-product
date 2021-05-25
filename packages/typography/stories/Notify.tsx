import { Meta, Story } from '@storybook/react/types-6-0';

import { NotifyText } from '../src';

export default {
  title: 'Typography/Notify',
  component: NotifyText,
} as Meta;

const Template: Story<{ color: string; children: string }> = ({ children, color, ...restArgs }) => (
  <div style={{ color }}>
    <NotifyText {...restArgs}>{children} (NotifyText)</NotifyText>
  </div>
);

export const notify = Template.bind({});
notify.args = {
  children: 'Пример',
};
notify.argTypes = {
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
