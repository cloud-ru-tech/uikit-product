import { styled } from '@linaria/react';
import { VFC } from 'react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';
import { BadgeProps } from './types';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const BadgeItemWrap = styled.span`
  display: inline-flex;
  position: relative;
`;

export const DotContainer = styled.div`
  display: flex;
  position: absolute;
  height: 16px;
  width: 16px;

  svg circle {
    fill: currentColor;
  }
`;

export const styledBadge = (Badge: VFC<BadgeProps>): VFC<BadgeProps> => styled(Badge)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -5px;
  left: 12px;
  width: fit-content;
  min-width: 16px;
  height: 16px;
  padding: 2px 4px;
  box-sizing: border-box;
  border-radius: 20px;
  font-size: 11px;
  line-height: 12px;
  color: var(${COLORS.content.info.default});
  background-color: var(${COLORS.background.info.default});
  border: 1px solid var(${COLORS.border});

  &[data-alert] {
    color: var(${COLORS.content.alert.default});
    background: var(${COLORS.background.alert.default});

    &[data-disabled] {
      color: var(${COLORS.content.alert.disabled});
      background: var(${COLORS.background.alert.disabled});
    }
  }

  &[data-disabled] {
    color: var(${COLORS.content.info.disabled});
    background: var(${COLORS.background.info.disabled});
  }
`;
