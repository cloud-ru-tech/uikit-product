import { ReactNode } from 'react';
import { Trigger } from 'react-popper-tooltip';

export declare const top: 'top';
export declare const bottom: 'bottom';
export declare const right: 'right';
export declare const left: 'left';
export declare const auto: 'auto';
export declare type BasePlacement =
  | typeof top
  | typeof bottom
  | typeof right
  | typeof left;

export declare type VariationPlacement =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end';
export declare type AutoPlacement = 'auto' | 'auto-start' | 'auto-end';
export declare type ComputedPlacement = VariationPlacement | BasePlacement;
export declare type Placement =
  | AutoPlacement
  | BasePlacement
  | VariationPlacement;

export interface ITooltipProps {
  hideArrow?: boolean;
  tooltip: ReactNode | Element;
  clickOutside?: boolean;
  closeOnReferenceHidden?: boolean;
  tooltipShown?: boolean;
  trigger: Trigger;
  placement: Placement;
  onVisibilityChange?: () => void;
}
