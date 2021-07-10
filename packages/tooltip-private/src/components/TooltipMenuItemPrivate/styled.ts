import { styled } from '@linaria/react';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_TOOLTIP } = DEPRECATED_EXPORT_VARS;

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
