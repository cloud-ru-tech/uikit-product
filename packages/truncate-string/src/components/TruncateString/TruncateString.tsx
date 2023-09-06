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
  | ({ variant?: Variant.End } & Omit<TruncateStringEndProps, 'tag' | 'typographyClassName'>)
  | ({ variant: Variant.Middle } & Omit<TruncateStringMiddleProps, 'tag' | 'typographyClassName'>)
);

export function TruncateString({
  variant = Variant.End,
  textEntity = TextEntity.Text2,
  ...props
}: TruncateStringProps) {
  const tag = getTag(textEntity);
  const typographyClassName: string = Typography[textEntity];

  switch (variant) {
    case Variant.Middle: {
      return <TruncateStringMiddle {...props} tag={tag} typographyClassName={typographyClassName} />;
    }

    case Variant.End:
    default: {
      return <TruncateStringEnd {...props} tag={tag} typographyClassName={typographyClassName} />;
    }
  }
}

TruncateString.textEntities = TextEntity;
TruncateString.placements = Tooltip.placements;
TruncateString.variants = Variant;
