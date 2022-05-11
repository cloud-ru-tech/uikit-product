import { styled } from '@linaria/react';

import { H4_SEMIBOLD_STYLES, TEXT_2_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

import {
  ToggleCardBox,
  ToggleCardBoxCaption,
  ToggleCardBoxDescription,
  ToggleCardBoxTitle,
} from '../../helperComponents';

export const Box = styled(ToggleCardBox)`
  align-items: center;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export const Text = styled.span`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  text-align: center;
`;

export const Title = styled(ToggleCardBoxTitle)`
  ${H4_SEMIBOLD_STYLES};
`;

export const Description = styled(ToggleCardBoxDescription)`
  ${TEXT_2_STYLES};
`;

export const Caption = styled(ToggleCardBoxCaption)`
  ${TEXT_3_STYLES};
`;
