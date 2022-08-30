import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

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

const Wrapper = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const Template: Story<PredefinedMLSpaceLogoProps & PredefinedCloudLogoProps> = ({ ...args }) => (
  <Wrapper>
    <PredefinedMLSpaceLogo {...args} />
    <PredefinedCloudLogo {...args} />
  </Wrapper>
);

export const predefinedLogosPrivate = Template.bind({});
predefinedLogosPrivate.args = {
  height: 30,
};
predefinedLogosPrivate.argTypes = {};
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
