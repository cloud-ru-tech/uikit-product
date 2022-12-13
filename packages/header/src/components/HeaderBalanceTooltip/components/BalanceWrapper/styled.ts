import { styled } from '@linaria/react';

import { COLORS } from '../../themes';

export const BalanceWrapper = styled.button`
  background: none;
  border: none;
  color: var(${COLORS.text.default});
  column-gap: 4px;
  cursor: pointer;
  display: flex;
  margin: 0 4px;
  padding: 0;

  &:disabled {
    cursor: default;
  }
`;
