import { styled } from '@linaria/react';

import { H4_SEMIBOLD_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

import { ToggleCardBox, ToggleCardBoxCaption, ToggleCardBoxTitle } from '../../helperComponents';

export const Box = styled(ToggleCardBox)`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const Text = styled.span`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const Title = styled(ToggleCardBoxTitle)`
  ${H4_SEMIBOLD_STYLES};
`;

export const Caption = styled(ToggleCardBoxCaption)`
  ${TEXT_3_STYLES};
`;
