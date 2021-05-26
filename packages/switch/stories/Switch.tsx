import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Switch as SwitchComponent } from '../src';

export default {
  title: 'Components/Switch',
  component: SwitchComponent,
} as Meta;

const Template: Story = ({ checked: propsChecked, ...args }) => {
  const [checked, setChecked] = useState(propsChecked);
  return <SwitchComponent checked={checked} onChange={setChecked} {...args} />;
};

export const Switch = Template.bind({});
Switch.argTypes = {
  checked: {
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};
