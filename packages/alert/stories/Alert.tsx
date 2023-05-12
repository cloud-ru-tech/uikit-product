import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Alert, AlertProps } from '../src';

export default {
  title: 'Components/Alert/Alert',
  component: Alert,
} as Meta;

type Props = AlertProps & { hideCloseButton: boolean };

const Template = ({ hideCloseButton, ...args }: Props) => (
  <Alert {...args} onClose={hideCloseButton ? undefined : args.onClose} />
);

export const alert: StoryFn<Props> = Template.bind({});

alert.args = {
  title: 'Title',
  description: 'Description',
  type: Alert.types.Success,
  variant: Alert.variants.Primary,
  hideCloseButton: true,
};
alert.argTypes = {
  hideCloseButton: {
    name: '[Stories]: Hide Close Button',
    type: 'boolean',
  },
  description: {
    type: 'string',
  },
};
alert.parameters = {
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
