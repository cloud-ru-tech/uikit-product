import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PredefinedIconsPrivate, PredefinedIconsPrivateProps } from '../src';

export default {
  title: 'Components/Predefined Icons Private',
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
    // TODO: url must be updated as soon as the page for these icons is created
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%92%A0%E2%9C%B3%EF%B8%8F-%5BLIB%5D-Platform-Design-System?node-id=3477%3A46230',
  },
  badges: [BADGE.BETA, BADGE.PRIVATE],
};
