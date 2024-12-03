import './motion.css';

import type { DrawerProps } from 'rc-drawer';
import type { SwipeDirections } from 'react-swipeable';

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

export const POSITION_TO_SWIPE_DIRECTION_MAP: Record<Position, SwipeDirections> = {
  right: 'Right',
  left: 'Left',
  top: 'Up',
  bottom: 'Down',
};
