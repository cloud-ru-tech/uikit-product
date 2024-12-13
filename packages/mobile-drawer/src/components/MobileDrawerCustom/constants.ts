import './motion.css';

import type { DrawerProps } from 'rc-drawer';

import type { SwipeDirections } from '@snack-uikit/utils';

import { Position } from '../../types';

export const maskMotion: DrawerProps['maskMotion'] = {
  motionAppear: true,
  motionName: 'maskMotionMobile',
};

export const motion: DrawerProps['motion'] = placement => ({
  motionAppear: true,
  motionName: `panelMotionMobile-${placement}`,
});

export const motionProps: Partial<DrawerProps> = {
  maskMotion,
  motion,
};

export const SWIPE_DIRECTION_TO_POSITION_MAP: Record<SwipeDirections, Position> = {
  Right: 'right',
  Left: 'left',
  Up: 'top',
  Down: 'bottom',
};

export const POSITION_TO_SWIPE_DIRECTION_MAP = Object.fromEntries(
  Object.entries(SWIPE_DIRECTION_TO_POSITION_MAP).map(([key, value]) => [value, key]),
) as Record<Position, SwipeDirections>;

export const DRAWER_CLOSING_TIMEOUT = 300;
