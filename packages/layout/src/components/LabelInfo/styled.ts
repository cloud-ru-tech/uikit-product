import { styled } from '@linaria/react';

import { Size } from './constants';

export const LabelWithTooltipContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  &[data-size=${Size.Large}] {
    padding: 12px 0;
  }
`;
