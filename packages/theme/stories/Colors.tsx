import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { H2, Text3 } from '@sbercloud/uikit-typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { COLORS_DEFAULT_MAP, EXPORT_VARS } from '../src';

export default {
  title: 'Theme/Colors',
} as Meta;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 288px);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  border-radius: 8px;
`;

const Color = styled.div<{ background: string }>`
  background: ${p => `var(${p.background})`};
  color: ${p => `var(${p.background})`};
  width: 96px;
`;

const Item = styled.div<{ border: string }>`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 34px;
`;

const Text = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const textCSS = css`
  padding-left: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  background: var(${EXPORT_VARS.PURPLE[10]});
`;

const Title = styled.div<{ background: string; color: string }>`
  width: 100%;
  height: 132px;
  border-radius: 8px 8px 0 0;
  color: ${p => p.color};
  background: ${p => p.background};
  display: flex;
  align-items: flex-end;
  & > * {
    margin: 12px 16px;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
`;

const COLOR_VARIANT_LIST = [
  { name: 'Grey', value: EXPORT_VARS.GREY, color: '#fff', background: '#5b5b5b' },
  { name: 'Blue grey', value: EXPORT_VARS.BLUE_GREY, color: '#fff', background: '#212830' },
  { name: 'Purple', value: EXPORT_VARS.PURPLE, color: '#fff', background: '#5558fa' },
  { name: 'Purple Alpha', value: EXPORT_VARS.PURPLE_ALFA, color: '#fff', background: '#5558fa' },
  { name: 'Green', value: EXPORT_VARS.GREEN, color: '#343f48', background: '#07e897' },
  { name: 'Green Alpha', value: EXPORT_VARS.GREEN_ALFA, color: '#343f48', background: '#07e897' },
  { name: 'Black Alpha', value: EXPORT_VARS.BLACK_ALFA, color: '#fff', background: '#000000' },
  { name: 'White Alpha', value: EXPORT_VARS.WHITE_ALFA, color: '#343f48', background: '#fff' },
  {
    name: 'Color',
    value: EXPORT_VARS.PRESET,
    color: '#fff',
    background: 'linear-gradient(90deg, #FEAC5E 0%, #C779D0 50%, #4BC0C8 100%)',
  },
];

const color_hex = JSON.parse(`{
  ${COLORS_DEFAULT_MAP.replaceAll('\n', '')
    .replaceAll(' ', '')
    .replaceAll('--', '"--')
    .replaceAll(':', '":"')
    .replaceAll(';', '",')
    .replace(/.$/, '')}
}`);

const Template: Story<typeof EXPORT_VARS.PRESET> = () => (
  <Wrapper>
    {COLOR_VARIANT_LIST.map(colorVariant => (
      <Group key={colorVariant.name}>
        <Title background={colorVariant.background} color={colorVariant.color}>
          <H2>{colorVariant.name}</H2>
        </Title>
        {Object.entries(colorVariant.value).map(([key, color]) => (
          <Item key={key} border={colorVariant.background}>
            <Color data-color={color} background={color} key={key}></Color>
            <Text>
              <Text3 className={textCSS}>{key}</Text3>
              <Text3 className={textCSS}>{color_hex[color]}</Text3>
            </Text>
          </Item>
        ))}
      </Group>
    ))}
  </Wrapper>
);

export const Colors = Template.bind({});

Colors.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=1015%3A1',
  },
  badges: [BADGE.NEEDS_REVISION, BADGE.BETA],
};
