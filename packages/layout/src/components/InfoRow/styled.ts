import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

export const FieldWrapper = styled.div`
  max-width: 718px;
  width: 100%;
`;

export const Field = styled.div`
  padding: 20px 0;
  display: flex;
  column-gap: 24px;

  &:last-child {
    padding-bottom: 0;
  }
`;

export const Value = styled.div`
  ${TEXT_2_STYLES};
  width: 100%;
`;

export const Label = styled(Value)`
  max-width: 208px;
  color: var(${EXPORT_VARS.GREY[600]});
`;
