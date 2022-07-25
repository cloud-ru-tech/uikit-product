import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AlertBanner, AlertBannerProps } from '../src';

export default {
  title: 'Components/Alert/Alert Banner',
  component: AlertBanner,
} as Meta;

const Template: Story<AlertBannerProps & { hideCloseButton: boolean }> = ({ hideCloseButton, ...args }) => (
  <AlertBanner {...args} onClose={hideCloseButton ? undefined : args.onClose} />
);

export const alertBanner = Template.bind({});

alertBanner.args = {
  title: 'Title',
  description: 'Description',
  type: AlertBanner.types.Alarm,
  hideCloseButton: false,
  buttonProps: { text: 'Button Text' },
};

alertBanner.argTypes = {
  hideCloseButton: {
    type: 'boolean',
    name: '[Stories]: Hide Close Button',
  },
  description: {
    type: 'string',
  },
};

alertBanner.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=959%3A15815',
  },
  badges: [BADGE.STABLE],
};
