import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

const { GREY } = EXPORT_VARS;

export const Content = styled.div`
  ${TEXT_2_STYLES};
  word-break: break-all;
  color: var(${GREY[600]});
`;

export const TextField = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const CopyValue = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
`;
