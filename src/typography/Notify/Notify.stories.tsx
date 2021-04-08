import { Story, Meta } from '@storybook/react/types-6-0';

import { NotifyText } from './index';

export default {
  title: 'Typography/Notify',
  component: NotifyText,
} as Meta;

const Template: Story<{ color: string; children: string }> = ({
  children,
  ...restArgs
}) => (
  <div style={{ color: restArgs.color }}>
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
