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
    url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/Cmwj5iKjN1YQVClS16yh36/Product-components?node-id=13486-14518m=auto',
  },
};
