import { css } from '@linaria/core';

import Z_INDEX from 'vars/zIndex';

export const tooltipStyle = css`
  border: none;
  border-radius: 4px;
  background-color: #ffffff;
  z-index: ${Z_INDEX.TOOLTIP};
`;

export const triggerStyle = css`
  height: 100%;
`;
