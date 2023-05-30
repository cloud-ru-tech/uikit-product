import { cx } from '@linaria/core';

import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractDataProps } from '@sbercloud/uikit-product-utils';

import { TextEntity } from '../../constants';
import {
  TruncateStringEnd,
  TruncateStringEndProps,
  TruncateStringMiddle,
  TruncateStringMiddleProps,
} from '../../helperComponents';
import { Variant } from './constants';
import * as Typography from './styled';
import { getTag } from './utils';

export type TruncateStringProps = { textEntity?: TextEntity; textClassName?: string } & (
  | ({ variant?: Variant.End } & Omit<TruncateStringEndProps, 'tag' | 'textClassName'>)
  | ({ variant: Variant.Middle } & Omit<TruncateStringMiddleProps, 'tag' | 'textClassName'>)
);

export function TruncateString({
  variant = Variant.End,
  textEntity = TextEntity.Text2,
  textClassName,
  ...props
}: TruncateStringProps) {
  const tag = getTag(textEntity);
  const textClassNameInner = Typography[textEntity];

  switch (variant) {
    case Variant.Middle: {
      const { text, className, placement, hideTooltip, ...rest } = props;
      return (
        <TruncateStringMiddle
          text={text}
          className={className}
          placement={placement}
          tag={tag}
          textClassName={cx(textClassNameInner, Typography.textClassName, textClassName)}
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
        ...rest
      } = props as unknown as TruncateStringEndProps;
      return (
        <TruncateStringEnd
          text={text}
          className={className}
          placement={placement}
          tag={tag}
          textClassName={cx(textClassNameInner, Typography.textClassName, textClassName)}
          maxLines={maxLines}
          hideTooltip={hideTooltip}
          {...extractDataProps(rest)}
        />
      );
    }
  }
}

TruncateString.textEntities = TextEntity;
TruncateString.placements = Tooltip.placements;
TruncateString.variants = Variant;
