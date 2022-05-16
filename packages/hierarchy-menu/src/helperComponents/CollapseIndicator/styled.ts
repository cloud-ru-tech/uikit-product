import { styled } from '@linaria/react';

import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-product-icons';

export const CollapsedIcon = styled(DropdownDownInterfaceSVG)`
  &[data-collapsed] {
    transform: rotate(-90deg);
  }
`;
