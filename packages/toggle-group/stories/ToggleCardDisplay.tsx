import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { ModelInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ToggleCardDisplay, ToggleCardDisplayProps, ToggleGroup } from '../src';

const meta: Meta = {
  title: 'Components/Toggle Group/Toggle Card/Display',
  component: ToggleCardDisplay,
};
export default meta;

function Template(args: ToggleCardDisplayProps) {
  const [value, setValue] = useState<number[]>();

  return (
    <ToggleGroup mode={ToggleGroup.mode.Checkbox} value={value} onChange={setValue}>
      <ToggleCardDisplay {...args} value={1} icon={<ModelInterfaceSVG />} />
    </ToggleGroup>
  );
}

export const display: StoryFn<ToggleCardDisplayProps> = Template.bind({});
display.args = { title: 'Title' };
display.argTypes = {};
display.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=12824%3A200633',
  },
};
