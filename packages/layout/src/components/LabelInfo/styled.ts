import { styled } from '@linaria/react';

import { Size } from './constants';

export const LabelWithTooltipContainer = styled.div`
  &[data-size=${Size.Large}] {
    padding: 12px 0;
  }

  &[data-size=${Size.Medium}] {
    padding: 7px 0;
  }
`;

export const LabelWithTooltipIcon = styled.div`
  vertical-align: middle;
  display: inline;
`;
