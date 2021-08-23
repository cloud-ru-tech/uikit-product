import { styled } from '@linaria/react';

import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Container = styled.div<{
  multiline: boolean;
}>`
  width: 100%;
  border-radius: 4px;
  padding: 8px 8px 8px 12px;
  box-sizing: border-box;
  background-color: var(${COLORS.BACKGROUND_COLOR});
  display: ${({ multiline }) => (multiline ? 'initial' : 'flex')};
  flex-direction: ${({ multiline }) => (multiline ? 'initial' : 'row-reverse')};
  justify-content: ${({ multiline }) => (multiline ? 'initial' : 'space-between')};

  ${TYPOGRAPHY_VARIABLES.TEXT_2}
`;

export const StyledText = styled.span<{
  multiline: boolean;
}>`
  margin: 4px 8px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  color: var(${COLORS.COLOR});
  white-space: ${({ multiline }) => (multiline ? 'pre-wrap' : 'nowrap')};
`;

export const IconsContainer = styled.div`
  display: flex;
  float: right;

  > * {
    margin-left: 4px;
  }
`;
