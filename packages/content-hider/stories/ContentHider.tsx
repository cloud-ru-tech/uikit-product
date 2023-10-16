import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ContentHider, ContentHiderProps } from '../src';

const meta: Meta = {
  title: 'Not stable/Content Hider',
  component: ContentHider,
};
export default meta;

const contentString = 'lorem ipsum dolor sit amet ';
const content = [...new Array(300)].map(() => contentString).join('');

function Template({ ...args }: ContentHiderProps) {
  return <ContentHider {...args}>{content}</ContentHider>;
}

export const contentHider: StoryFn<ContentHiderProps> = Template.bind({});
contentHider.args = {};
contentHider.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
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
