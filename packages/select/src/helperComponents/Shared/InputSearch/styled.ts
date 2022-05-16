import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';

const { COLORS_INPUT } = DEPRECATED_EXPORT_VARS;

export const searchIconClassname = css`
  align-self: center;
  fill: var(${COLORS_INPUT.INPUT_ICON_COLOR});
  cursor: pointer;
  &:focus,
  &:hover {
    fill: var(${COLORS_INPUT.INPUT_ICON_HOVER_COLOR});
  }
`;

export const crossIconClassName = css`
  align-self: center;
  fill: var(${COLORS_INPUT.INPUT_ICON_COLOR});
  cursor: pointer;
  &:focus,
  &:hover {
    fill: var(${COLORS_INPUT.INPUT_ICON_HOVER_COLOR});
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 8px;
`;
