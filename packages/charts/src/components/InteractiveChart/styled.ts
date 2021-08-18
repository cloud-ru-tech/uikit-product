import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  & .uplot {
    font-family: inherit;
    background-color: var(${COLORS.BACKGROUND});
    padding: 16px 0;
    border-radius: 8px;
  }

  & .uplot .u-title {
    font-size: 20px;
    text-align: unset;
    padding-left: 24px;
  }

  /* mouse cross hair */
  & .u-hz .u-cursor-x,
  & .u-vt .u-cursor-y,
  & .u-hz .u-cursor-y,
  & .u-vt .u-cursor-x {
    border-color: var(${COLORS.CURSOR});
  }

  /* Selected area */
  & .u-select {
    background-color: var(${COLORS.SELECTED_AREA});
  }

  & table .u-series .u-marker {
    width: 14px;
    height: 14px;
    border-radius: 14px;
  }
`;
