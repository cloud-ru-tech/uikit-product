import { styled } from '@linaria/react';
import { COLORS_GENERAL } from 'theme/color/vars';

export const NoRowsMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 105px;
  color: var(${COLORS_GENERAL.TEXT});
`;
