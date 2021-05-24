import { css } from '@linaria/core';

import Z_INDEX from 'vars/zIndex';
import { COLORS_FILTER } from 'theme/color/vars';

export const tooltipClassName = css`
  background: var(${COLORS_FILTER.FILTER_BACKGROUND});
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);

  max-height: inherit;
  max-width: 640px;
  width: 640px;
  padding: 0 24px;
  color: inherit;

  z-index: ${Z_INDEX.FILTER};
  overflow: inherit;
`;

export const tooltipWrapperClassName = css`
  overflow: inherit;
`;
