import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Meta, Story } from '@storybook/react';
import { ComponentProps } from 'react';

import { CircleAddInterfaceSVG } from '@sbercloud/uikit-react-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonToolbar } from '../src';

export default {
  title: 'Not stable/Button/Button Toolbar',
  component: ButtonToolbar,
} as Meta;

const Template: Story<Pick<ComponentProps<typeof ButtonToolbar>, 'disabled'>> = ({ ...args }) => (
  <ButtonToolbar title='Add' {...args}>
    <CircleAddInterfaceSVG />
  </ButtonToolbar>
);

export const buttonToolbar = Template.bind({});

buttonToolbar.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=1098%3A22594',
  },
  controls: { include: ['disabled'] },
  badges: [BADGE.NEEDS_REVISION, BADGE.BETA],
};
buttonToolbar.args = {
  disabled: false,
};
