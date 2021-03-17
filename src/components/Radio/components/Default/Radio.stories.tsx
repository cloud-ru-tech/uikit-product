import { Story, Meta } from '@storybook/react/types-6-0';

import { Radio, IRadioProps } from './Radio';

export default {
  title: 'Components/Radio',
  component: Radio,
} as Meta;

const Template: Story<IRadioProps> = ({ ...args }) => (
  <Radio {...args} value='story1' />
);

export const radio = Template.bind({});
radio.args = {};
radio.parameters = {};
