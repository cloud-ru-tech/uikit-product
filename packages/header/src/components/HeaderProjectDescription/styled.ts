import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, DARK_THEMES, LIGHT_THEMES } from './themes';

LIGHT_THEMES;
DARK_THEMES;

export const Description = styled.div`
  ${TEXT_2_STYLES};
  color: var(${COLORS.text});

  display: flex;
  align-items: center;
  grid-area: header-project-description;
  margin-left: 16px;
  margin-right: 8px;
`;
