import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CHARTS_GRID_STYLES, MONO_14_BOLD_STYLES, MONO_14_STYLES, NOTIFY_STYLES, TABLE_TEXT_STYLES } from '../src';

export default {
  title: 'Typography/Special',
} as Meta;

const TableText = styled.div`
  ${TABLE_TEXT_STYLES};
`;

const Notify = styled.div`
  ${NOTIFY_STYLES};
`;

const Mono14 = styled.div`
  ${MONO_14_STYLES};
`;

const Mono14Bold = styled.div`
  ${MONO_14_BOLD_STYLES};
`;

const ChartsGrid = styled.div`
  ${CHARTS_GRID_STYLES};
`;

const Template: Story = () => (
  <>
    <TableText>Пример (TableText)</TableText>
    <Notify>Пример (Notify)</Notify>
    <Mono14>Пример (Mono14)</Mono14>
    <Mono14Bold>Пример (Mono14Bold)</Mono14Bold>
    <ChartsGrid>Пример (ChartsGrid)</ChartsGrid>
  </>
);

export const special = Template.bind({});
special.parameters = {
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
