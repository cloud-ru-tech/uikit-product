import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

export const LabelWrapper = styled.span`
  ${TEXT_2_STYLES};

  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
