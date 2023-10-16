import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ToggleCardExtended, ToggleCardExtendedProps, ToggleGroup } from '../src';

const meta: Meta = {
  title: 'Components/Toggle Group/Toggle Card/Extended',
  component: ToggleCardExtended,
};
export default meta;

function Template(args: ToggleCardExtendedProps) {
  const [value, setValue] = useState<number[]>();

  return (
    <ToggleGroup mode={ToggleGroup.mode.Checkbox} value={value} onChange={setValue}>
      <ToggleCardExtended {...args} value={1} />
    </ToggleGroup>
  );
}

export const extended: StoryFn<ToggleCardExtendedProps> = Template.bind({});
extended.args = {
  title: 'Title',
  displayedValue: 'Displayed value',
  description: 'Description',
  label: 'Label',
};
extended.argTypes = {};
extended.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=12824%3A200633',
  },
};
