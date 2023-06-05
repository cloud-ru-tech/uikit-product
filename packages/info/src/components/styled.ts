import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { H3_SEMIBOLD_STYLES, H4_SEMIBOLD_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

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

export const Fields = styled.div`
  padding-top: 4px;
`;

export const FieldWrapper = styled.div`
  max-width: 718px;
  width: 100%;
`;

export const Field = styled.div`
  padding: 20px 0;
  display: flex;
  column-gap: 24px;

  &:last-child {
    padding-bottom: 0px;
  }
`;

export const Value = styled.div`
  ${TEXT_2_STYLES};
  width: 100%;
`;

export const Label = styled(Value)`
  max-width: 200px;
  color: var(${EXPORT_VARS.GREY[600]});
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 32px;
`;
