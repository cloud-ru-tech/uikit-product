import { styled } from '@linaria/react';
import { COLORS_SELECT } from 'theme/color/vars';

export const StyledContainer = styled.div`
  font-family: SB Sans Interface;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: var(${COLORS_SELECT.TEXT_COLOR});
  padding: 12px;
`;
