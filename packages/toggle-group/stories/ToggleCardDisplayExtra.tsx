import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { ModelInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ToggleCardDisplayExtra, ToggleCardDisplayExtraProps, ToggleGroup } from '../src';

export default {
  title: 'Components/Toggle Group/Toggle Card/Display Extra',
  component: ToggleCardDisplayExtra,
} as Meta;

const Template: StoryFn<ToggleCardDisplayExtraProps> = args => {
  const [value, setValue] = useState<number[]>();

  return (
    <ToggleGroup mode={ToggleGroup.mode.Checkbox} value={value} onChange={setValue}>
      <ToggleCardDisplayExtra {...args} value={1} icon={<ModelInterfaceSVG />} />
    </ToggleGroup>
  );
};

export const displayExtra = Template.bind({});
displayExtra.args = { title: 'Title', description: 'Description', caption: 'Caption' };
displayExtra.argTypes = {};
displayExtra.parameters = {
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
