import { Story, Meta } from '@storybook/react/types-6-0';
import { ConfigProvider, ConfigProviderProps } from '../src/components/ConfigProvider';

import componentReadme from '../README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import { Button } from '@sbercloud/uikit-react-button';
import { useTheme } from '../src/hooks/useTheme';
import { styled } from '@linaria/react';
import { H1, H3, Text2 } from '@sbercloud/uikit-typography';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { css } from '@linaria/core';
import { Divider } from '@sbercloud/uikit-react-divider';
import { LanguageCodeType, Themes } from '../src/types';
import { useLanguage } from '../src/hooks/useLanguage';

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
    #sbercloud-theme-wrapper[data-theme='purple'] {
      ${BACKGROUND_COLOR}: var(${GREY[0]});
    }
    #sbercloud-theme-wrapper[data-theme='purpleDark'] {
      ${BACKGROUND_COLOR}: var(${GREY[850]});
    }
    #sbercloud-theme-wrapper[data-theme='green'] {
      ${BACKGROUND_COLOR}: var(${GREY[0]});
    }
    #sbercloud-theme-wrapper[data-theme='greenDark'] {
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
  const { changeTheme, theme, Themes } = useTheme();
  const { code, changeLanguage } = useLanguage();
  return (
    <ConfigProvider {...args}>
      <Wrapper>
        <H1>Theme Settings</H1>
        <Divider className={dividerCSS} />
        <Title>
          <H3>
            Активная темма: <ThemeWrapper theme={theme}>{theme}</ThemeWrapper>
          </H3>
        </Title>
        <Title>
          <H3>Cмена темы через changeTheme</H3>
          <Text2>(нажми на кнопку)</Text2>
        </Title>
        <ConfigBody>
          <Button onClick={() => changeTheme(Themes.Purple)}>Purple Theme</Button>
          <Button onClick={() => changeTheme(Themes.PurpleDark)}>Purple Dark Theme</Button>
          <Button onClick={() => changeTheme(Themes.Green)}>Green Theme</Button>
          <Button onClick={() => changeTheme(Themes.GreenDark)}>Green Dark Theme</Button>
        </ConfigBody>
      </Wrapper>
      <Wrapper>
        <H1>Language Settings</H1>
        <Divider className={dividerCSS} />
        <Title>
          <H3>
            Активный код языка: <ThemeWrapper theme={theme}>{code}</ThemeWrapper>
          </H3>
        </Title>
        <Title>
          <H3>Cмена языка через changeLanguage</H3>
          <Text2>(нажми на кнопку)</Text2>
        </Title>
        <ConfigBody>
          <Button onClick={() => changeLanguage(LanguageCodeType.ruRU)}>ruRU</Button>
          <Button onClick={() => changeLanguage(LanguageCodeType.enUS)}>enUS</Button>
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
};
