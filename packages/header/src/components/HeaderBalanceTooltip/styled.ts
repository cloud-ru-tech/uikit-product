import { styled } from '@linaria/react';

import { RechargeButton as RechargeButtonInner } from './components';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  grid-area: header-balance-tooltip;
  width: fit-content;
`;

export const Frame = styled.div`
  background-color: var(${COLORS.background.default});
  border-radius: 100px;
  border: 1px solid var(${COLORS.border.default});
  display: flex;
  padding: 4px;
`;

export const RechargeButton = styled(RechargeButtonInner)`
  margin-right: 4px;
`;

export const Icon = styled.div`
  ${RechargeButton} + & {
    margin-left: 4px;
  }
`;
