import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { StatusIcon, StatusIconProps } from '../src';

export default {
  title: 'Components/Status/Status Icon',
  component: StatusIcon,
} as Meta;

const Template: Story<StatusIconProps> = args => <StatusIcon {...args} />;

export const statusIcon = Template.bind({});
statusIcon.args = { type: StatusIcon.types.Success };
statusIcon.argTypes = {};
statusIcon.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=3477%3A46230',
  },
};
