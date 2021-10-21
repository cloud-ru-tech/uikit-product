import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { Text3 } from '@sbercloud/uikit-typography';

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

export const Amount = styled(Text3)`
  display: inline-block;
  color: var(${EXPORT_VARS.GREY[600]});
`;

export const Value = styled.div`
  font-size: 14px;
`;
