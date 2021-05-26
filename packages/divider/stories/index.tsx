import { Meta, Story } from '@storybook/react/types-6-0';

import { Divider, DividerProps } from '../src';

export default {
  title: 'Components/Divider',
  component: Divider,
} as Meta;

const Template: Story<DividerProps> = ({ ...args }) => <Divider {...args} />;

export const divider = Template.bind({});
divider.args = {
  color: 'dark',
};
divider.argTypes = {
  color: {
    control: {
      type: 'radio',
      options: ['dark', 'middle', 'light'],
    },
  },
};
