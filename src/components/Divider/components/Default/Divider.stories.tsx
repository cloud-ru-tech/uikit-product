import { Story, Meta } from '@storybook/react/types-6-0';

import { Divider, TDividerProps } from './Divider';

export default {
  title: 'Components/Divider',
  component: Divider,
} as Meta;

const Template: Story<TDividerProps> = ({ ...args }) => <Divider {...args} />;

export const divider = Template.bind({});
divider.args = {
  color: 'dark',
};

divider.argTypes = {
  color: {
    control: {
      type: 'color',
    },
  },
};
