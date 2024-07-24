import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileBlockBasic, MobileBlockBasicProps } from '../src';

const meta: Meta = {
  title: 'Mobile/Layout/Block Basic',
  component: MobileBlockBasic,
};
export default meta;

function Template({ ...args }: MobileBlockBasicProps) {
  return <MobileBlockBasic {...args} />;
}

export const blockBasic: StoryFn<MobileBlockBasicProps> = Template.bind({});

blockBasic.args = {};

blockBasic.argTypes = {};

blockBasic.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    //TODO: update to the correct one
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
