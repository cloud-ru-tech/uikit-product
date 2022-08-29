import { styled } from '@linaria/react';

import { H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
`;

export const Title = styled.h5`
  ${H5_STYLES};
  color: var(${COLORS.TITLE});
  margin-bottom: 8px;
  text-align: center;
`;

export const DescContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

export const Description = styled.p`
  ${TEXT_2_STYLES};
  color: var(${COLORS.DESCRIPTION});
  margin: 0;
  text-align: center;
`;
