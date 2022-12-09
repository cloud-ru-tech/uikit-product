import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractDataProps } from '@sbercloud/uikit-product-utils';

import { Tag } from '../../constants';
import {
  TruncateStringEnd,
  TruncateStringEndProps,
  TruncateStringMiddle,
  TruncateStringMiddleProps,
} from '../../helperComponents';
import { Variant } from './constants';

export type TruncateStringProps =
  | ({ variant?: Variant.End } & TruncateStringEndProps)
  | ({ variant: Variant.Middle } & TruncateStringMiddleProps);

export function TruncateString({ variant = Variant.End, ...props }: TruncateStringProps) {
  switch (variant) {
    case Variant.Middle: {
      const { text, className, placement, tag, hideTooltip, ...rest } = props;
      return (
        <TruncateStringMiddle
          text={text}
          className={className}
          placement={placement}
          tag={tag}
          hideTooltip={hideTooltip}
          {...extractDataProps(rest)}
        />
      );
    }

    case Variant.End:
    default: {
      const {
        text,
        className,
        placement,
        maxLines = 1,
        hideTooltip,
        tag,
        ...rest
      } = props as unknown as TruncateStringEndProps;
      return (
        <TruncateStringEnd
          text={text}
          className={className}
          placement={placement}
          tag={tag}
          maxLines={maxLines}
          hideTooltip={hideTooltip}
          {...extractDataProps(rest)}
        />
      );
    }
  }
}

TruncateString.tags = Tag;
TruncateString.placements = Tooltip.placements;
TruncateString.variants = Variant;
