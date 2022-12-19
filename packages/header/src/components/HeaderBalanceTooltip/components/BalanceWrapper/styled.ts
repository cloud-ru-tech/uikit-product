import { styled } from '@linaria/react';

import { COLORS } from '../../themes';

export const BalanceWrapper = styled.button`
  cursor: pointer;

  display: flex;
  column-gap: 4px;

  margin: 0 4px;
  padding: 0;

  color: var(${COLORS.text.default});

  background: none;
  border: none;

  &:disabled {
    cursor: default;
  }
`;
