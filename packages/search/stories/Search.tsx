import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Search, SearchProps } from '../src';

const meta: Meta = {
  title: 'Not stable/Search',
  component: Search,
};
export default meta;

function Template({ ...args }: SearchProps) {
  const [value, setValue] = useState('');

  return <Search {...args} value={value} onChange={setValue} />;
}

export const search: StoryFn<SearchProps> = Template.bind({});
search.args = {};
search.argTypes = {};
search.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=6414%3A87991',
  },
  badges: [BADGE.BETA],
};
