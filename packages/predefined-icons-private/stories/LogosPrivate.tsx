import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

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

const meta: Meta = {
  title: 'Snack Uikit/Icons/Predefined/Predefined Logos Private',
};
export default meta;

const Wrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  padding: 16px;

  &[data-variant=${PredefinedCloudLogo.variants.OnAccent}] {
    background-color: ${themeVars.sys.invertNeutral.background};
  }
`;

type Props = PredefinedMLSpaceLogoProps & PredefinedCloudLogoProps;

function Template({ ...args }: Props) {
  return (
    <Wrapper data-variant={args.variant}>
      <PredefinedMLSpaceLogo {...args} />
      <PredefinedCloudLogo {...args} />
    </Wrapper>
  );
}

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
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=212%3A350',
  },
  badges: [BADGE.STABLE],
};
