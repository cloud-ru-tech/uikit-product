import { Meta, Story } from '@storybook/react/types-6-0';

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

const Template: Story<BadgeProps> = ({ ...args }) => (
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
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=520%3A10653',
  },
  badges: [BADGE.STABLE, BADGE.PRIVATE],
};
badge.argTypes = {};
