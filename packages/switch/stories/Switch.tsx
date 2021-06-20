import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Switch as SwitchComponent } from '../src';

export default {
  title: 'Not stable/Switch',
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
Switch.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
