import { Story, Meta } from '@storybook/react/types-6-0';

import { Divider, IDividerProps } from './Divider';

export default {
  title: 'Components/Divider',
  component: Divider,
} as Meta;

const Template: Story<IDividerProps> = ({ ...args }) => <Divider {...args} />;

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
