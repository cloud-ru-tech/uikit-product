import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  PredefinedMLSpaceLogo,
  PredefinedMLSpaceLogoProps,
  PredefinedSberCloudLogo,
  PredefinedSberCloudLogoProps,
} from '../src';

export default {
  title: 'Components/Predefined/Predefined Logos Private',
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
    // TODO: url must be updated as soon as the page for these icons is created
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%92%A0%E2%9C%B3%EF%B8%8F-%5BLIB%5D-Platform-Design-System?node-id=3477%3A46230',
  },
  badges: [BADGE.BETA, BADGE.PRIVATE],
};
