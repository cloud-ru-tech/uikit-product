import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Container = styled.div`
  background: var(${COLORS.BACKGROUND});
  padding: 24px;

  border-radius: 8px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Switch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.span`
  ${TEXT_2_STYLES};
  color: var(${COLORS.DATE});
`;
