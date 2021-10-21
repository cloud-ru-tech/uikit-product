import { css } from '@linaria/core';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

export const IconClassName = css`
  fill: var(${EXPORT_VARS.GREY[200]});
  transition: 0.2s;
  &:hover {
    fill: var(${EXPORT_VARS.BLUE_GREY[100]});
  }
`;
