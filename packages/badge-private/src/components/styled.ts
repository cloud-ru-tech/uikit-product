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
    fill: var(${COLORS.DOT_DEFAULT_COLOR});
  }

  &[data-alert] {
    svg circle {
      fill: var(${COLORS.DOT_ALERT_COLOR});
    }
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
  color: var(${COLORS.DEFAULT_TEXT_COLOR});
  background-color: var(${COLORS.DEFAULT_BACKGROUND});
  border: 1px solid var(${COLORS.BORDER});

  &[data-alert] {
    color: var(${COLORS.ALERT_TEXT_COLOR});
    background: var(${COLORS.ALERT_BACKGROUND});
  }

  &[data-disabled] {
    color: var(${COLORS.DISABLED_TEXT_COLOR});
    background: var(${COLORS.DISABLED_DEFAULT_BACKGROUND});
  }

  &[data-alert][data-disabled] {
    background: var(${COLORS.DISABLED_ALERT_BACKGROUND});
  }
`;
