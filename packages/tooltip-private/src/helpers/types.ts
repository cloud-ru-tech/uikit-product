import { ReactNode } from 'react';
import { Config, PopperOptions } from 'react-popper-tooltip';

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

export enum TriggerTypes {
  Click = 'click',
  RightClick = 'right-click',
  Hover = 'hover',
  Focus = 'focus',
}

export interface TooltipPrivateProps extends Omit<Config, 'trigger'> {
  popperOptions?: PopperOptions;
  children?: React.ReactNode;
  hideArrow?: boolean;
  tooltip: ReactNode | Element;
  clickOutside?: boolean;
  placement: Placements;
  classNameContainer?: string;
  classNameArrow?: string;
  classNameTrigger?: string;
  getTooltipRef?: (ref: HTMLElement | null) => void;
  trigger?: TriggerTypes | TriggerTypes[] | null;
}
