import { css } from '@linaria/core';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_GENERAL } = EXPORT_VARS;

export const containerClassName = css`
  color: var(${COLORS_GENERAL.TEXT});
  padding: 0;
`;
