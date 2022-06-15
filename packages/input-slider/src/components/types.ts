import { TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

export type InputSliderBaseProps = WithSupportProps<{
  className?: string;
  disabled?: boolean;
  hint?: string;
  postfix?: string;
  label?: string;
  labelTooltip?: Pick<TooltipProps, 'title' | 'content' | 'link' | 'icon' | 'iconAction'>;
  marks?: number[];
  max: number;
  min: number;
  optional?: boolean;
  step?: number;
}>;

export type InputSliderProps = InputSliderBaseProps & {
  value: number;
  onChange: (value: number) => void;
};

export type InputRangeProps = InputSliderBaseProps & {
  value: [number, number];
  onChange: (value: [number, number]) => void;
};
