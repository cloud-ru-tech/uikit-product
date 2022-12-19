import { styled } from '@linaria/react';

import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_FULL_WIDTH } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: ${SIDEBAR_FULL_WIDTH};
  height: 100%;
  padding: 16px 0;

  background-color: var(${COLORS.background});
  border-right: 1px solid var(${COLORS.border});

  &[data-collapsed] {
    width: ${SIDEBAR_COLLAPSED_WIDTH};
  }

  &,
  * {
    box-sizing: border-box;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex: 1 0 auto;
`;
