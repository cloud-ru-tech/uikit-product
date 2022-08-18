import { css } from '@linaria/core';

import { COLORS } from '../themes';

export const blackQuoteClassName = css`
  border-left: 4px solid var(${COLORS.BLOCKQUOTE.BORDER_COLOR});
  padding: 8px 16px;
  margin: 0;
`;
