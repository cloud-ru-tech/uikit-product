import { Story, Meta } from '@storybook/react/types-6-0';

import { COLORS_GENERAL } from 'theme/color/vars';

import { NotifyText, TNotifyProps } from './index';

export default {
  title: 'Typography/Notify',
  component: NotifyText,
} as Meta;

const Template: Story<TNotifyProps & { children: string }> = ({
  children,
  ...restArgs
}) => (
  <div>
    <NotifyText {...restArgs}>{children} (NotifyText)</NotifyText>
  </div>
);

export const notify = Template.bind({});
notify.args = {
  color: `var(${COLORS_GENERAL.TEXT})`,
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
