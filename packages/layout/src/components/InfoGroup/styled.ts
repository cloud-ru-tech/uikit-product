import { styled } from '@linaria/react';

import { H3_SEMIBOLD_STYLES, H4_SEMIBOLD_STYLES } from '@sbercloud/uikit-product-typography';

import { BlockBasic } from '../BlockBasic';

export const InfoWrapper = styled(BlockBasic)`
  border-radius: 16px;
`;

export const H3 = styled.h3`
  ${H3_SEMIBOLD_STYLES};
`;

export const H4 = styled.h4`
  ${H4_SEMIBOLD_STYLES};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
`;
