import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { TruncatedTextWithTooltip } from '../../helperComponents';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const Item = styled.a`
  --sidebar-item__backround-color: transparent;
  --sidebar-item__text-color: var(${COLORS.text.default});

  ${TEXT_2_STYLES};
  padding: 8px 16px;
  background-color: var(--sidebar-item__backround-color);
  cursor: pointer;
  transition: background-color ${ANIMATIONS.TRANSITION};
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  user-select: none;

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

    cursor: not-allowed;
  }

  &[data-active] {
    --sidebar-item__text-color: var(${COLORS.text.active});
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 8px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled(TruncatedTextWithTooltip)`
  color: var(--sidebar-item__text-color);
  transition: color ${ANIMATIONS.TRANSITION};
`;

export const Padding = styled.div<{ level?: number }>`
  // 28 = 20 + 8, 20 - icon size, 8 margin-right
  margin-left: ${({ level = 0 }) => level * 28}px;
`;
