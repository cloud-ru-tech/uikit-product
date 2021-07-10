import { styled } from '@linaria/react';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_GENERAL } = DEPRECATED_EXPORT_VARS;

export const NoRowsMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 105px;
  min-height: 105px;
  color: var(${COLORS_GENERAL.TEXT});
  fill: #5558fa;
`;
