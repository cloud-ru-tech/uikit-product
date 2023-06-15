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

export type TruncateStringProps = { textEntity?: TextEntity } & (
  | ({ variant?: Variant.End } & Omit<TruncateStringEndProps, 'tag'>)
  | ({ variant: Variant.Middle } & Omit<TruncateStringMiddleProps, 'tag'>)
);

export function TruncateString({
  variant = Variant.End,
  textEntity = TextEntity.Text2,
  ...props
}: TruncateStringProps) {
  const tag = getTag(textEntity);
  const className = cx(props.className, Typography[textEntity]);

  switch (variant) {
    case Variant.Middle: {
      return <TruncateStringMiddle {...props} tag={tag} className={className} />;
    }

    case Variant.End:
    default: {
      return <TruncateStringEnd {...props} tag={tag} className={className} />;
    }
  }
}

TruncateString.textEntities = TextEntity;
TruncateString.placements = Tooltip.placements;
TruncateString.variants = Variant;
