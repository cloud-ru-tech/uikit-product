import { Story, Meta } from '@storybook/react/types-6-0';

import { Radio } from './Radio';

export default {
  title: 'Components/Radio/Default',
  component: Radio,
} as Meta;

const Template: Story = ({ children, ...args }) => (
  <Radio {...args} value='story1' label='story1' description='description1' />
);

export const Type = Template.bind({});

Type.args = {};

Type.parameters = {};
