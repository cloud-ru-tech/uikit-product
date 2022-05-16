import { styled } from '@linaria/react';

import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const SelectedHighlighter = styled.div<{ left: number; width: number }>`
  width: ${props => props.width}px;
  min-height: 0;
  max-height: 0;
  border: 1px solid;
  border-color: var(${COLORS.highlighter});
  background-color: var(${COLORS.highlighter});
  border-radius: 8px;

  position: absolute;
  left: ${props => props.left}px;
  bottom: 0;

  transition: ${ANIMATIONS.TRANSITION};
  transition-property: left, width;
`;
