import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { H1_STYLES, H2_STYLES, H3_SEMIBOLD_STYLES, H3_STYLES, H4_SEMIBOLD_STYLES, H4_STYLES, H5_STYLES } from '../src';

export default {
  title: 'Typography/Headers',
} as Meta;

const H1 = styled.h1`
  ${H1_STYLES};
`;

const H2 = styled.h2`
  ${H2_STYLES};
`;

const H3 = styled.h3`
  ${H3_STYLES};
`;

const H3Semibold = styled.h3`
  ${H3_SEMIBOLD_STYLES};
`;

const H4 = styled.h4`
  ${H4_STYLES};
`;

const H4Semibold = styled.h4`
  ${H4_SEMIBOLD_STYLES};
`;

const H5 = styled.h5`
  ${H5_STYLES};
`;

const Template: Story = () => (
  <>
    <H1>Пример (H1)</H1>
    <H2>Пример (H2)</H2>
    <H3>Пример (H3)</H3>
    <H3Semibold>Пример (H3Semibold)</H3Semibold>
    <H4>Пример (H4)</H4>
    <H4Semibold>Пример (H4Semibold)</H4Semibold>
    <H5>Пример (H5)</H5>
  </>
);

export const headers = Template.bind({});
headers.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Platform-Design-System?node-id=1133%3A25062',
  },
};
