import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

export const CustomOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(${EXPORT_VARS.GREY[800]});
  padding: 8px 12px;
  &:hover {
    cursor: pointer;
    background-color: var(${EXPORT_VARS.GREY[100]});
  }
`;

export const Amount = styled.span`
  ${TEXT_3_STYLES};
  display: inline-block;
  color: var(${EXPORT_VARS.GREY[600]});
`;

export const Label = styled.div`
  font-size: 14px;
`;
