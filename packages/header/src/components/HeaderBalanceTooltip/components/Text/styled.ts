import { styled } from '@linaria/react';

import { H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const RegularText = styled.span`
  ${TEXT_2_STYLES};
`;

export const PrimaryText = styled.span`
  ${H5_STYLES};
`;

export const SecondaryText = styled.span`
  ${TEXT_2_STYLES};
  color: var(${COLORS.text.secondary});
`;
