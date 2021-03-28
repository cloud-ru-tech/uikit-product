import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Switch as SwitchComponent } from './Switch';

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
