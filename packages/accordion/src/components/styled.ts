import { styled } from '@linaria/react';

import { H3_SEMIBOLD_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const AccordionWrapper = styled.div`
  background-color: var(${COLORS.DEFAULT_BG});
  display: flex;
  justify-content: space-between;
  padding: 24px;
  gap: 24px;
  border-radius: 8px;
`;

export const AccordionHeader = styled.div`
  color: var(${COLORS.DEFAULT_HEADER_COLOR});
  ${H3_SEMIBOLD_STYLES};
`;

export const AccordionSubheader = styled.div`
  color: var(${COLORS.DEFAULT_SUBHEADER_COLOR});
  ${TEXT_2_STYLES};
`;

export const AccordionButtons = styled.div`
  display: flex;
  gap: 16px;
`;
