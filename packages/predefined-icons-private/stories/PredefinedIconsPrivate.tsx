import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PredefinedIconsPrivate, PredefinedIconsPrivateProps } from '../src';

export default {
  title: 'Components/Predefined/Predefined Icons Private',
  component: PredefinedIconsPrivate,
} as Meta;

const Template: Story<PredefinedIconsPrivateProps> = ({ ...args }) => <PredefinedIconsPrivate {...args} />;

export const predefinedIconsPrivate = Template.bind({});
predefinedIconsPrivate.args = {
  icon: PredefinedIconsPrivate.icons.Success,
};
predefinedIconsPrivate.argTypes = {};
predefinedIconsPrivate.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=212%3A350',
  },
  badges: [BADGE.BETA, BADGE.PRIVATE],
};
