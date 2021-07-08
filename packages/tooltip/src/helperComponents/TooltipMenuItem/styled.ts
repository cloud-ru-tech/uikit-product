import { styled } from '@linaria/react';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_TOOLTIP } = EXPORT_VARS;

export const TooltipWrapper = styled.div`
  gap: 10px;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 0 12px;
  fill: var(${COLORS_TOOLTIP.MENU_ITEM_ICON_FILL});
  &:hover {
    background-color: var(${COLORS_TOOLTIP.MENU_ITEM_HOVER_BG});
  }
`;
