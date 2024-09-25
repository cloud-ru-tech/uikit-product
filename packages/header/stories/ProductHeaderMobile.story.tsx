import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Header } from '../src';
import { ARG_TYPES, ARGS, getTemplate, StoryProps } from './headerTemplate';

const meta: Meta = {
  title: 'Snack Uikit/Header/Mobile',
  component: Header,
};
export default meta;

export const mobile: StoryFn<StoryProps> = getTemplate({ layoutType: 'mobile' }).bind({});

mobile.args = ARGS;
mobile.argTypes = ARG_TYPES;

mobile.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/x6Rr5vkx6lrAJnlJ9nxpJl/branch/SG0EZxVoaD0AxdVvL8jHtN/Header?node-id=3%3A10&mode=dev',
  },
};
