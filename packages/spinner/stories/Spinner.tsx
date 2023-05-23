import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Spinner, SpinnerProps } from '../src';

export default {
  title: 'Components/Spinner',
  component: Spinner,
} as Meta;

const Container = styled.div`
  width: 500px;
  height: 500px;
  border: 1px solid var(${themeVars.sys.neutral.decorDefault});
  border-radius: 10%;
  background-color: var(${themeVars.sys.neutral.background2Level});
`;

const Template: StoryFn<SpinnerProps> = ({ ...args }) => (
  <Container>
    <Spinner {...args} />
  </Container>
);

export const spinner = Template.bind({});
spinner.args = {};
spinner.argTypes = {};
spinner.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=3477%3A46976',
  },
  badges: [BADGE.DEPRECATED],
  snackUiLink: 'https://frontend.cp.sbercloud.tech/snack/?path=/story/components-loaders-spinner--spinner',
};
