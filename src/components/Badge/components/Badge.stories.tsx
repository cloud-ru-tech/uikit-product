import { Story, Meta } from '@storybook/react/types-6-0';

import { Button } from 'components/Button';

import { Badge, IBadgeProps } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
} as Meta;

const Template: Story<IBadgeProps> = ({ ...args }) => (
  <Badge text='5' {...args}>
    <Button variant='outlined'>Button</Button>
  </Badge>
);

export const badge = Template.bind({});
badge.args = {};
badge.argTypes = {
  color: {
    control: {
      type: 'color',
    },
  },
};
