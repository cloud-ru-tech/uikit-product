import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, DARK_THEMES, LIGHT_THEMES } from './themes';

DARK_THEMES;
LIGHT_THEMES;

export const TextField = styled.div`
  ${TEXT_2_STYLES};
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  color: var(${COLORS.text});
`;

export const CopyValue = styled.div`
  ${H5_STYLES};
  display: flex;
  max-width: 100%;
  align-items: center;
  column-gap: 6px;
`;

export const subtitleClassName = css`
  ${TEXT_2_STYLES};
  max-width: 100%;
`;
