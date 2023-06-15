import { cx } from '@linaria/core';

import { Tooltip } from '@sbercloud/uikit-product-tooltip';

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
  ...props
}: TruncateStringProps) {
  const tag = getTag(textEntity);
  const textClassName = cx(Typography[textEntity], Typography.textClassName, props.textClassName);

  switch (variant) {
    case Variant.Middle: {
      return <TruncateStringMiddle {...props} tag={tag} textClassName={textClassName} />;
    }

    case Variant.End:
    default: {
      return <TruncateStringEnd {...props} tag={tag} textClassName={textClassName} />;
    }
  }
}

TruncateString.textEntities = TextEntity;
TruncateString.placements = Tooltip.placements;
TruncateString.variants = Variant;
