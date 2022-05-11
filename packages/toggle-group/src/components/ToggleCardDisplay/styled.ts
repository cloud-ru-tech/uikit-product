import { styled } from '@linaria/react';

import { H4_STYLES } from '@sbercloud/uikit-product-typography';

import { ToggleCardBox, ToggleCardBoxTitle } from '../../helperComponents';

export const Box = styled(ToggleCardBox)`
  align-items: center;
  column-gap: 16px;
  display: flex;
`;

export const Title = styled(ToggleCardBoxTitle)`
  ${H4_STYLES};
`;
