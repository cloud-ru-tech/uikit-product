import { Meta, Story } from '@storybook/react/types-6-0';

import { Button } from '@sbercloud/uikit-react-button';

import { Badge, BadgeProps } from '../src';

export default {
  title: 'Components/Badge',
  component: Badge,
} as Meta;

const Template: Story<BadgeProps> = ({ ...args }) => (
  <Badge {...args}>
    <Button variant={Button.variants.Outlined}>Button</Button>
  </Badge>
);

export const badge = Template.bind({});
badge.args = {
  text: '5',
};
badge.argTypes = {
  color: {
    control: {
      type: 'color',
    },
  },
};
