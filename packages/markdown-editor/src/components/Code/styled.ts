import { css } from '@linaria/core';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS } from '../themes';

export const prismClassName = css`
  max-height: 400px;
  box-sizing: border-box;
  margin: 0 !important;
  background-color: var(${COLORS.CODE.BACKGROUND_COLOR}) !important;

  & code {
    text-shadow: none !important;
    color: var(${COLORS.COLOR_DEFAULT}) !important;
    font-size: 14px !important;
    line-height: 20px !important;
  }

  & code,
  code > span {
    ${TEXT_2_STYLES};
    text-shadow: none !important;
    background: none !important;
  }
`;

export const codeClassName = css`
  ${TEXT_2_STYLES};
  text-shadow: none;
  color: var(${COLORS.COLOR_DEFAULT});
  background-color: var(${COLORS.CODE.BACKGROUND_COLOR});
`;
