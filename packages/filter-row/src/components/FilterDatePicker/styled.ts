import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS } from './themes';

export const Container = styled.div`
  background: var(${COLORS.BACKGROUND});
  padding: 24px;

  border-radius: 8px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Switch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.span`
  ${TEXT_2_STYLES};
`;
