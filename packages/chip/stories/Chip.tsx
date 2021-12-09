import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { useEffect } from '@storybook/addons';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Chip, ChipProps } from '../src';

export default {
  title: 'Components/Chip',
  component: Chip,
} as Meta;

const Template: Story<ChipProps> = ({ checked, ...args }) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => setIsChecked(checked), [checked]);

  return <Chip {...args} handleChange={checked => setIsChecked(checked)} checked={isChecked} />;
};

export const chip = Template.bind({});
chip.args = {
  label: 'Chip',
  size: Chip.sizes.Medium,
  variant: Chip.variants.Primary,
};
chip.argTypes = {};
chip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Product-Design-System?node-id=5839%3A83547',
  },
};
