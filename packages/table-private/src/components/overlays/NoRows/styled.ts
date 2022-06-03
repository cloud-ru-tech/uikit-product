import { styled } from '@linaria/react';

import { H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const NoRowsOverlay = styled.div`
  background-color: var(${COLORS.background});
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
`;

export const NoRowsOverlayIconWrap = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 100%;
  background-color: var(${COLORS.icon.background});
  fill: var(${COLORS.icon.fill});
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
`;

export const NoRowsOverlayTitle = styled.h5`
  ${H5_STYLES};
  color: var(${COLORS.title});
  margin-bottom: 8px;
`;

export const NoRowsOverlayDescription = styled.div`
  ${TEXT_2_STYLES};
  color: var(${COLORS.description});
`;
