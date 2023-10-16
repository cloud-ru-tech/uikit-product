import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AlertCompact, AlertCompactProps } from '../src';

const meta: Meta = {
  title: 'Components/Alert/Alert Compact',
  component: AlertCompact,
};

export default meta;

function Template({ ...args }: AlertCompactProps) {
  return <AlertCompact {...args} />;
}

export const alertCompact: StoryFn<AlertCompactProps> = Template.bind({});
alertCompact.args = {
  description: 'Description',
  type: AlertCompact.types.Default,
  linkProps: {
    text: 'Link',
    showSuffixIcon: true,
  },
};
alertCompact.argTypes = {
  description: {
    type: 'string',
  },
};
alertCompact.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=959%3A15815',
  },
  badges: [BADGE.STABLE],
};
