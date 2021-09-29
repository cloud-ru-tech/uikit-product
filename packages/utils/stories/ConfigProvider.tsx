import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Button } from '@sbercloud/uikit-react-button';
import { Divider } from '@sbercloud/uikit-react-divider';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { H1, H3, Text2 } from '@sbercloud/uikit-typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ConfigProvider, ConfigProviderProps, LanguageCodeType, Themes, useLanguage, useTheme } from '../src';

const { GREY } = EXPORT_VARS;

export default {
  title: 'Utils/Config Provider',
  component: ConfigProvider,
} as Meta;

const ConfigBody = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 12px;
`;

const Title = styled.div`
  margin: 24px 0;
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

const Template: Story<ConfigProviderProps> = ({ ...args }) => {
  const { changeTheme, theme } = useTheme();
  const { languageCode, changeLanguage } = useLanguage();
  return (
    <ConfigProvider {...args}>
      <Wrapper>
        <H1>Theme Setting</H1>
        <Divider className={dividerCSS} />
        <Title>
          <H3>
            Активная тема: <ThemeWrapper theme={theme}>{theme}</ThemeWrapper>
          </H3>
        </Title>
        <Title>
          <H3>Смена темы через changeTheme</H3>
          <Text2>(нажми на кнопку)</Text2>
        </Title>
        <ConfigBody>
          <Button onClick={() => changeTheme(Themes.Purple)} text='Purple Theme' />
          <Button onClick={() => changeTheme(Themes.PurpleDark)} text='Purple Dark Theme' />
          <Button onClick={() => changeTheme(Themes.Green)} text='Green Theme' />
          <Button onClick={() => changeTheme(Themes.GreenDark)} text='Green Dark Theme' />
        </ConfigBody>
      </Wrapper>
      <Wrapper>
        <H1>Language Settings</H1>
        <Divider className={dividerCSS} />
        <Title>
          <H3>
            Активный код языка: <ThemeWrapper theme={theme}>{languageCode}</ThemeWrapper>
          </H3>
        </Title>
        <Title>
          <H3>Смена языка через changeLanguage</H3>
          <Text2>(нажми на кнопку)</Text2>
        </Title>
        <ConfigBody>
          <Button onClick={() => changeLanguage(LanguageCodeType.ruRU)} text='ruRU' />
          <Button onClick={() => changeLanguage(LanguageCodeType.enUS)} text='enUS' />
        </ConfigBody>
      </Wrapper>
    </ConfigProvider>
  );
};

export const configProvider = Template.bind({});
configProvider.args = {};
configProvider.argTypes = {};
configProvider.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
};
