import { styled } from '@linaria/react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const MobileWrapper = styled.header`
  display: grid;
  grid-template-columns: [header-logo] 1fr [header-balance-tooltip] auto [header-mobile-menu-trigger] auto;
  align-items: center;
  column-gap: 8px;
  padding: 8px 16px;
  background-color: var(${COLORS.background.default});
  box-sizing: border-box;

  & * {
    box-sizing: border-box;
  }
`;

export const MobileMenuTrigger = styled(ButtonIcon)`
  grid-area: header-mobile-menu-trigger;
`;
