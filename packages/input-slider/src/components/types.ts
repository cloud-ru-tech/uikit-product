import { TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

export type InputSliderBaseProps = {
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
};

export type InputSliderProps = WithSupportProps<
  InputSliderBaseProps & {
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
