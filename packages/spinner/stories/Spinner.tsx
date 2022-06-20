import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Spinner, SpinnerProps } from '../src';

export default {
  title: 'Components/Spinner',
  component: Spinner,
} as Meta;

const Container = styled.div<{ theme: Themes }>`
  width: 500px;
  height: 500px;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 10%;
  background-color: ${({ theme }) => (['purple', 'green'].includes(theme) ? '#ffffff' : '#333333')};
`;

const Template: Story<SpinnerProps> = ({ ...args }, { globals: { theme } }) => (
  <Container theme={theme}>
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
  badges: [BADGE.STABLE],
};
