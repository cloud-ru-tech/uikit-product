import { Meta, StoryFn } from '@storybook/react';

import { NotifyInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Badge, BadgeProps } from '../src';

export default {
  title: 'Components/Badge',
  component: Badge,
} as Meta;

const Template: StoryFn<BadgeProps> = ({ ...args }) => (
  <Badge {...args}>
    <NotifyInterfaceSVG />
  </Badge>
);

export const badge = Template.bind({});
badge.args = {
  number: 10,
  disabled: false,
  isGroupMessage: false,
  type: Badge.types.Info,
};
badge.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=520%3A10653',
  },
  badges: [BADGE.STABLE, BADGE.PRIVATE],
};
badge.argTypes = {};
