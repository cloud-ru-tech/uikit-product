import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ToggleCardExtended, ToggleCardExtendedProps, ToggleGroup } from '../src';

export default {
  title: 'Components/Toggle Group/Toggle Card Extended',
  component: ToggleCardExtended,
} as Meta;

const Template: Story<ToggleCardExtendedProps> = args => {
  const [value, setValue] = useState<number[]>();

  return (
    <ToggleGroup mode={ToggleGroup.mode.Checkbox} value={value} onChange={setValue}>
      <ToggleCardExtended {...args} value={1} />
    </ToggleGroup>
  );
};

export const toggleCardExtended = Template.bind({});
toggleCardExtended.args = {
  title: 'Title',
  displayedValue: 'Displayed value',
  description: 'Description',
  label: 'Label',
};
toggleCardExtended.argTypes = {};
toggleCardExtended.parameters = {
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
