import { css } from '@linaria/core';

import { COLORS_TABLE } from 'theme/color/vars';

export const helpIconClassName = css`
  fill: var(${COLORS_TABLE.TABLE_HELP_ICON_COLOR});

  &:focus,
  &:hover {
    fill: var(${COLORS_TABLE.TABLE_HELP_ICON_HOVER_COLOR});
  }
`;
