import { ReactNode } from 'react';
import { TooltipTriggerProps } from 'react-popper-tooltip';

export enum Placements {
  Auto = 'auto',
  AutoStart = 'auto-start',
  AutoEnd = 'auto-end',
  Top = 'top',
  Bottom = 'bottom',
  Right = 'right',
  Left = 'left',
  TopStart = 'top-start',
  TopEnd = 'top-end',
  BottomStart = 'bottom-start',
  BottomEnd = 'bottom-end',
  RightStart = 'right-start',
  RightEnd = 'right-end',
  LeftStart = 'left-start',
  LeftEnd = 'left-end',
}

export interface TooltipPrivateProps extends Partial<Omit<TooltipTriggerProps, 'tooltip' | 'children'>> {
  children?: React.ReactNode;
  hideArrow?: boolean;
  tooltip: ReactNode | Element;
  clickOutside?: boolean;
  placement: Placements;
  classNameContainer?: string;
  classNameArrow?: string;
  classNameTrigger?: string;
}
