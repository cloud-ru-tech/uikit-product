import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { H3_STYLES } from '@sbercloud/uikit-product-typography';
import { CSS_BREAKPOINTS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row nowrap;

  align-items: flex-start;
  justify-content: center;

  @media ${CSS_BREAKPOINTS.mobile} {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const IconContainer = styled.div`
  margin-right: 48px;

  @media ${CSS_BREAKPOINTS.mobile} {
    margin-bottom: 20px;
  }
`;

export const iconClassName = css`
  fill: var(${COLORS.ICON_FILL});
`;

export const Title = styled.h3`
  ${H3_STYLES};
  color: var(${COLORS.TITLE_TEXT});
`;

export const DescContainer = styled.div`
  max-width: 540px;
  color: var(${COLORS.CONTENT_TEXT});
`;
