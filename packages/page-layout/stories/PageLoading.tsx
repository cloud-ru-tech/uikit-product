import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PageLoading, PageLoadingProps } from '../src/components';

export default {
  title: 'Snack UIkit/Page Layout/Page Loading',
  component: PageLoading,
} as Meta;

const Template: StoryFn<PageLoadingProps> = args => <PageLoading {...args} />;

export const pageLoading = Template.bind({});

pageLoading.args = {};

pageLoading.argTypes = {};

pageLoading.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?node-id=2%3A17574&mode=design',
  },
  layout: 'fullscreen',
};
