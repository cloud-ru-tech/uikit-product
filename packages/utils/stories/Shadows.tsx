import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SHADOW, Themes, useTheme } from '../src';

const meta: Meta = {
  title: 'Theme/Shadow',
};
export default meta;

const ThemeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ShadowItem = styled.div`
  &:not(:last-of-type) {
    margin-right: 60px;
  }
`;

const ShadowPreview = styled.div<{ shadow?: string; theme: Themes }>`
  width: 250px;
  height: 250px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: ${({ shadow }) => shadow || 'none'};
  background-color: var(${DEPRECATED_EXPORT_VARS.COLORS_CARD.CARD_HOVER_BACKGROUND});
`;

const Text = styled.div`
  margin-top: 5px;
  text-align: center;
`;

function Template() {
  const { theme } = useTheme();

  return (
    <ThemeWrapper>
      {Object.keys(SHADOW).map(shadowKey => (
        <ShadowItem key={shadowKey}>
          <ShadowPreview shadow={SHADOW[shadowKey]} theme={theme}>
            {shadowKey}

            <Text>{SHADOW[shadowKey]}</Text>
          </ShadowPreview>
        </ShadowItem>
      ))}
    </ThemeWrapper>
  );
}

export const shadow: StoryFn = Template.bind({});
shadow.args = {};
shadow.argTypes = {};
shadow.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=1015%3A1',
  },
};
