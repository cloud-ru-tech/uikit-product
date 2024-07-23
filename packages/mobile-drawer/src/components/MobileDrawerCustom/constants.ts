import './motion.css';

import type { DrawerProps } from 'rc-drawer';

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
