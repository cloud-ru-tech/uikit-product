import { css } from '@linaria/core';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_TABLE } = DEPRECATED_EXPORT_VARS;

export const helpIconClassName = css`
  fill: var(${COLORS_TABLE.TABLE_HELP_ICON_COLOR});

  &:focus,
  &:hover {
    fill: var(${COLORS_TABLE.TABLE_HELP_ICON_HOVER_COLOR});
  }
`;
