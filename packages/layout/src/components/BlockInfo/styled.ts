import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { H3_SEMIBOLD_STYLES, H4_SEMIBOLD_STYLES } from '@sbercloud/uikit-product-typography';

export const InfoWrapper = styled.div`
  background-color: var(${EXPORT_VARS.GREY[0]});
  padding: 24px;
  border-radius: 16px;
`;

export const H3 = styled.h3`
  ${H3_SEMIBOLD_STYLES};
`;

export const H4 = styled.h4`
  ${H4_SEMIBOLD_STYLES};
`;

export const FieldsGroup = styled.div`
  padding-top: 36px;
  max-width: 718px;
  width: 100%;
`;

export const Fields = styled.div`
  padding-top: 4px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
`;
