import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ContentHider, ContentHiderProps } from '../src';

export default {
  title: 'Not stable/Content Hider',
  component: ContentHider,
} as Meta;

const contentString = 'lorem ipsum dolor sit amet ';
const content = [...new Array(300)].map(() => contentString).join('');

const Template: StoryFn<ContentHiderProps> = ({ ...args }) => <ContentHider {...args}>{content}</ContentHider>;

export const contentHider = Template.bind({});
contentHider.args = {};
contentHider.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
contentHider.argTypes = {
  backgroundColor: {
    control: {
      type: 'color',
    },
  },
};
