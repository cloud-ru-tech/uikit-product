import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_TABLE } = DEPRECATED_EXPORT_VARS;

export const CellBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: not-allowed;
`;

export const radioCheckedClassName = css`
  fill: var(${COLORS_TABLE.TABLE_RADIO_ICON_DISABLED_COLOR});
`;
