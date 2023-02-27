import React, { FocusEvent } from 'react';

import { TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

export type MarkDetail = {
  style?: React.CSSProperties;
  label?: React.ReactNode;
};

export enum MarksPlacement {
  Default = 'default',
  LinearOnlyMarks = 'linearOnlyMarks',
}

export type InputSliderBaseProps = {
  className?: string;
  disabled?: boolean;
  hint?: string;
  postfix?: string;
  label?: string;
  labelTooltip?: Pick<TooltipProps, 'title' | 'content' | 'link' | 'icon' | 'iconAction'>;
  marks?: number[] | Record<string, MarkDetail>;
  max: number;
  min: number;
  optional?: boolean;
  step?: number;
};

export type InputSliderProps = WithSupportProps<
  InputSliderBaseProps & {
    selectOnlyMarks?: boolean;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    marksPlacementType?: MarksPlacement;
    value: number;
    onChange: (value: number) => void;
  }
>;

export type InputRangeProps = WithSupportProps<
  InputSliderBaseProps & {
    value: [number, number];
    onChange: (value: [number, number]) => void;
  }
>;
