import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';

const { GREY, WHITE_ALFA } = EXPORT_VARS;

export const PieIndicator = styled.div<{ size?: number; completed: number }>`
  display: flex;
  width: ${({ size = 20 }) => size}px;
  height: ${({ size = 20 }) => size}px;
  border-radius: 50%;
  transform: scaleX(-1);
  background: conic-gradient(from 0deg, var(${GREY[0]}) ${({ completed }) => completed}%, var(${WHITE_ALFA[24]}) 0%);
`;
