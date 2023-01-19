import { styled } from '@linaria/react';

import { ANIMATIONS, DEFAULT_STYLES } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const GroupStyled = styled.ul`
  ${DEFAULT_STYLES.COMMON};
  box-sizing: content-box;

  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  user-select: none;
`;

export const GroupStyledContainer = styled.div`
  overflow-x: auto;

  // Hide Scrollbar
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &&::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

export const RelContainer = styled.nav`
  position: relative;
  overflow-x: hidden;

  &[data-dragged] {
    &,
    &:hover {
      cursor: grabbing;
    }

    li,
    li:hover {
      cursor: grabbing !important;
    }
  }
`;

const SHADOW_BOX_CSS = `
  width: 80px;
  height: 100%;
  position: absolute;
  background: transparent;
  pointer-events: none;
  opacity: 0;
  transition: opacity ${ANIMATIONS.TRANSITION};
`;

export const LeftShadowBox = styled.div`
  ${SHADOW_BOX_CSS};

  background: linear-gradient(90deg, var(${COLORS.shadow.active}), var(${COLORS.shadow.transparent}));
  left: 0;
  top: 0;

  &[data-active='true'] {
    opacity: 1;
  }
`;

export const RightShadowBox = styled.div`
  ${SHADOW_BOX_CSS};

  background: linear-gradient(270deg, var(${COLORS.shadow.active}), var(${COLORS.shadow.transparent}));
  right: 0;
  top: 0;

  &[data-active='true'] {
    opacity: 1;
  }
`;
