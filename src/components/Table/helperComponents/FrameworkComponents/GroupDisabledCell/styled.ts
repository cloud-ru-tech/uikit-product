import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_TABLE } from 'theme/color/vars';

export const CellBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: not-allowed;
`;

export const radioCheckedClassName = css`
  fill: var(${COLORS_TABLE.TABLE_RADIO_ICON_DISABLED_COLOR});
`;
