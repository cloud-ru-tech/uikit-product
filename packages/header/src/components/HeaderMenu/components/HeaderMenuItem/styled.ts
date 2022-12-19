import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

export const Link = styled.a`
  && svg {
    fill: var(${EXPORT_VARS.GREY[200]});
  }

  ${TEXT_2_STYLES};

  color: unset;
`;
