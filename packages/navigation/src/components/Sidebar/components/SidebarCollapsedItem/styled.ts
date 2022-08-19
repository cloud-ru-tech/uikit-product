import { styled } from '@linaria/react';

import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const Item = styled.div`
  padding: 8px 16px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color ${ANIMATIONS.TRANSITION};
  width: 100%;

  &:not([data-no-hover]) {
    &:hover {
      background-color: var(${COLORS.background.hover});
    }
  }

  &[data-no-hover] {
    cursor: default;
  }

  &[data-disabled] {
    cursor: not-allowed;
  }
`;

export const Icon = styled.div`
  flex-shrink: 0;
  display: flex;
  height: 20px;
  width: 20px;

  svg {
    fill: var(${COLORS.icon.default});
    transition: fill ${ANIMATIONS.TRANSITION};
    height: 100%;
    width: 100%;
  }

  &[data-disabled] svg {
    fill: var(${COLORS.icon.disabled});
  }

  &[data-selected] svg {
    fill: var(${COLORS.icon.selected});
  }
`;
