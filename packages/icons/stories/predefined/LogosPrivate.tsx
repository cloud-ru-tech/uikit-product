import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../../../predefined-icons-private/CHANGELOG.md';
import componentPackage from '../../../predefined-icons-private/package.json';
import componentReadme from '../../../predefined-icons-private/README.md';
import {
  PredefinedMLSpaceLogo,
  PredefinedMLSpaceLogoProps,
  PredefinedSberCloudLogo,
  PredefinedSberCloudLogoProps,
} from '../../../predefined-icons-private/src';

export default {
  title: 'Components/Icons/Predefined/Predefined Logos Private',
} as Meta;

const Wrapper = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const Template: Story<PredefinedMLSpaceLogoProps & PredefinedSberCloudLogoProps> = ({ ...args }) => (
  <Wrapper>
    <PredefinedMLSpaceLogo {...args} />
    <PredefinedSberCloudLogo {...args} />
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
  badges: [BADGE.BETA, BADGE.PRIVATE],
};
