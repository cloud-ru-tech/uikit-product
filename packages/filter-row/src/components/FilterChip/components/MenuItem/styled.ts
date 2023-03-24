import { styled } from '@linaria/react';

import { DropdownItem } from '@sbercloud/uikit-product-dropdown';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_THEME;
GREEN_DARK_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const MenuItem = styled(DropdownItem)`
  &:hover {
    background-color: var(${COLORS.background.hover});
  }

  & > label {
    max-width: 100%;
  }
`;
