import { styled } from '@linaria/react';

import { COLORS_TOOLTIP } from 'theme/color/vars';

export const TooltipWrapper = styled.div`
  gap: 10px;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 0 12px;
  &:hover {
    background-color: var(${COLORS_TOOLTIP.MENU_ITEM_HOVER_BG});
  }
`;
