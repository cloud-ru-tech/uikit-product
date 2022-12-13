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
  height: 100%;
  width: ${SIDEBAR_FULL_WIDTH};
  padding: 16px 0;
  border-right: 1px solid var(${COLORS.border});
  background-color: var(${COLORS.background});

  &[data-collapsed] {
    width: ${SIDEBAR_COLLAPSED_WIDTH};
  }

  &,
  * {
    box-sizing: border-box;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  overflow: hidden;

  position: relative;
  flex: 1 0 auto;
`;
