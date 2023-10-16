import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@sbercloud/uikit-product-button';
import { Divider } from '@sbercloud/uikit-product-divider';
import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { H1_STYLES, H3_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ConfigProvider, ConfigProviderProps, LanguageCodeType, Themes, useLanguage, useTheme } from '../src';

const { GREY } = EXPORT_VARS;

const meta: Meta = {
  title: 'Utils/Config Provider',
  component: ConfigProvider,
};
export default meta;

const ConfigBody = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 12px;
  grid-column-gap: 20px;
`;

const Header = styled.h1`
  ${H1_STYLES};
`;

const TitleWrapper = styled.div`
  margin: 24px 0;
`;

const Title = styled.h3`
  ${H3_STYLES};
`;

const Caption = styled.span`
  ${TEXT_2_STYLES};
`;

const dividerCSS = css`
  margin-top: 12px;
`;

const BACKGROUND_COLOR = '--story-config-provider-background-color';

const configProviderTheme = `
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${BACKGROUND_COLOR}: var(${GREY[0]});
    }
    body[data-theme='${Themes.PurpleDark}'] {
      ${BACKGROUND_COLOR}: var(${GREY[850]});
    }
    body[data-theme='${Themes.Green}'] {
      ${BACKGROUND_COLOR}: var(${GREY[0]});
    }
    body[data-theme='${Themes.GreenDark}'] {
      ${BACKGROUND_COLOR}: var(${GREY[850]});
    }
  }
`;

css`
  ${configProviderTheme}
`;

const Wrapper = styled.div`
  margin-top: 24px;
  padding: 24px;
  border-radius: 8px;
  background: var(${BACKGROUND_COLOR});
`;

const COLOR_MAP = {
  [Themes.Purple]: '#aaabfd',
  [Themes.PurpleDark]: '#5558fa',
  [Themes.Green]: '#07E897',
  [Themes.GreenDark]: '#157552',
};

const ThemeWrapper = styled.span<{ theme: Themes }>`
  color: ${props => COLOR_MAP[props.theme]};
`;

function Template({ ...args }: ConfigProviderProps) {
  const { changeTheme, theme } = useTheme();
  const { languageCode, changeLanguage } = useLanguage();
  return (
    <ConfigProvider {...args}>
      <Wrapper>
        <Header>Theme Setting</Header>
        <Divider className={dividerCSS} />
        <TitleWrapper>
          <Title>
            Активная тема: <ThemeWrapper theme={theme}>{theme}</ThemeWrapper>
          </Title>
        </TitleWrapper>
        <TitleWrapper>
          <Title>Смена темы через changeTheme</Title>
          <Caption>(нажми на кнопку)</Caption>
        </TitleWrapper>
        <ConfigBody>
          <Button onClick={() => changeTheme(Themes.Purple)} text='Purple Theme' />
          <Button onClick={() => changeTheme(Themes.PurpleDark)} text='Purple Dark Theme' />
          <Button onClick={() => changeTheme(Themes.Green)} text='Green Theme' />
          <Button onClick={() => changeTheme(Themes.GreenDark)} text='Green Dark Theme' />
        </ConfigBody>
      </Wrapper>
      <Wrapper>
        <Header>Language Settings</Header>
        <Divider className={dividerCSS} />
        <TitleWrapper>
          <Title>
            Активный код языка: <ThemeWrapper theme={theme}>{languageCode}</ThemeWrapper>
          </Title>
        </TitleWrapper>
        <TitleWrapper>
          <Title>Смена языка через changeLanguage</Title>
          <Caption>(нажми на кнопку)</Caption>
        </TitleWrapper>
        <ConfigBody>
          <Button onClick={() => changeLanguage(LanguageCodeType.ruRU)} text='ruRU' />
          <Button onClick={() => changeLanguage(LanguageCodeType.enUS)} text='enUS' />
        </ConfigBody>
      </Wrapper>
    </ConfigProvider>
  );
}

export const configProvider: StoryFn<ConfigProviderProps> = Template.bind({});
configProvider.args = {};
configProvider.argTypes = {};
configProvider.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  badges: [BADGE.STABLE],
};
