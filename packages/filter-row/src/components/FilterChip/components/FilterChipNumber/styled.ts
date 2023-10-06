import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { SHADOW } from '@sbercloud/uikit-product-utils';

export const popoverClassName = css`
  box-shadow: ${SHADOW.MEDIUM};
  border-radius: 8px;
`;

export const FilterLabel = styled(TruncateString)`
  max-width: 180px;
`;
