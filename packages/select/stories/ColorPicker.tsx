import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ColorPicker } from '../src';

const meta: Meta = {
  title: 'Not stable/Select/Color Picker',
  component: ColorPicker,
};
export default meta;

function Template() {
  return <ColorPicker />;
}

export const colorPicker: StoryFn = Template.bind({});

colorPicker.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=11428%3A185606',
  },
};
