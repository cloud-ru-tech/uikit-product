import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { GlobalTypes } from '@storybook/types';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  PredefinedCloudLogo,
  PredefinedCloudLogoProps,
  PredefinedMLSpaceLogo,
  PredefinedMLSpaceLogoProps,
} from '../src';

export default {
  title: 'Components/Icons/Predefined/Predefined Logos Private',
} as Meta;

const Wrapper = styled.div<{ theme: Themes }>`
  display: grid;
  grid-gap: 20px;
  padding: 16px;

  &[data-variant=${PredefinedCloudLogo.variants.OnAccent}] {
    background-color: ${({ theme }) =>
      ['purple', 'green'].includes(theme) ? `var(${EXPORT_VARS.GREY[800]})` : `var(${EXPORT_VARS.GREY[0]})`};
  }
`;

type Props = PredefinedMLSpaceLogoProps & PredefinedCloudLogoProps;

const Template = ({ ...args }: Props, { globals: { theme } }: GlobalTypes) => (
  <Wrapper data-variant={args.variant} theme={theme}>
    <PredefinedMLSpaceLogo {...args} />
    <PredefinedCloudLogo {...args} />
  </Wrapper>
);

export const predefinedLogosPrivate: StoryFn<Props> = Template.bind({});
predefinedLogosPrivate.args = {
  height: 30,
  variant: PredefinedCloudLogo.variants.OnDefault,
};
predefinedLogosPrivate.argTypes = {
  variant: {
    control: {
      type: 'radio',
    },
    options: Object.values(PredefinedCloudLogo.variants),
  },
};
predefinedLogosPrivate.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=212%3A350',
  },
  badges: [BADGE.STABLE],
};
