import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FilterRow, FilterRowProps } from '../src';
import { filtersMock } from './helpers';

export default {
  title: 'Not stable/Filter Row',
  component: FilterRow,
} as Meta;

const Template: StoryFn<FilterRowProps> = ({ ...args }) => <FilterRow {...args} />;

export const filterRow = Template.bind({});
filterRow.args = {
  filters: filtersMock,
  // eslint-disable-next-line no-console
  onChange: console.log,
};
filterRow.argTypes = {};
filterRow.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=54371-259099&t=DfI6vH1Hrazas0NB-0',
  },
};
