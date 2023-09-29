import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, DARK_THEMES, LIGHT_THEMES } from './themes';

LIGHT_THEMES;
DARK_THEMES;

export const Description = styled.div`
  ${TEXT_2_STYLES};

  /* To fix bug with truncated string inside flex */
  min-width: 0;

  display: flex;
  grid-area: header-project-description;
  align-items: center;

  margin-right: 8px;
  margin-left: 16px;

  color: var(${COLORS.text});
`;

export const descriptionClassName = css`
  width: 100%;
`;
