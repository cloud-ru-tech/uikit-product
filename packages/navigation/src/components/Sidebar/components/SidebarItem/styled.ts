import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const Item = styled.div`
  --sidebar-item__backround-color: transparent;
  --sidebar-item__text-color: var(${COLORS.text.default});
  --sidebar-item__icon-color: var(${COLORS.icon.default});

  ${TEXT_2_STYLES};
  padding: 8px 16px;
  background-color: var(--sidebar-item__backround-color);
  cursor: pointer;
  transition: background-color ${ANIMATIONS.TRANSITION};
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;

  &:not([data-disabled]) {
    &:not([data-no-hover]) {
      &:hover {
        --sidebar-item__backround-color: var(${COLORS.background.hover});
      }
    }
  }

  &[data-no-hover] {
    cursor: default;
  }

  &[data-disabled] {
    --sidebar-item__text-color: var(${COLORS.text.disabled});
    --sidebar-item__icon-color: var(${COLORS.icon.disabled});

    cursor: not-allowed;
  }

  &[data-selected] {
    --sidebar-item__text-color: var(${COLORS.text.selected});
    --sidebar-item__icon-color: var(${COLORS.icon.selected});
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.div`
  flex-shrink: 0;
  margin-right: 8px;
  display: flex;
  height: 20px;
  width: 20px;

  svg {
    fill: var(--sidebar-item__icon-color);
    transition: fill ${ANIMATIONS.TRANSITION};
    height: 100%;
    width: 100%;
  }
`;

export const Text = styled.div`
  color: var(--sidebar-item__text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color ${ANIMATIONS.TRANSITION};
`;
