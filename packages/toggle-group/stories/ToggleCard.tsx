import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { ModelInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ToggleCard, ToggleCardProps, ToggleGroup } from '../src';

export default {
  title: 'Components/Toggle Group/Toggle Card',
  component: ToggleCard,
} as Meta;

const Template: Story<ToggleCardProps & { showIcon: boolean }> = ({ showIcon, ...args }) => {
  const [value, setValue] = useState<number[]>();

  return (
    <ToggleGroup mode={ToggleGroup.mode.Checkbox} value={value} onChange={setValue}>
      <ToggleCard {...args} value={1} icon={showIcon && <ModelInterfaceSVG />} />
    </ToggleGroup>
  );
};

export const toggleCard = Template.bind({});
toggleCard.args = { title: 'Title', showIcon: true, description: 'Description' };
toggleCard.argTypes = {
  showIcon: {
    type: 'boolean',
    name: '[Stories]: Show or not Icon',
  },
};
toggleCard.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%92%A0%E2%9B%94%EF%B8%8F-%5BLIB%5D-Platform-Design-System?node-id=12824%3A200633',
  },
};
