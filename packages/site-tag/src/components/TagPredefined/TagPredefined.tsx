import { WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ValueOf } from '@snack-uikit/utils';

import { TagSpecial } from '../../helperComponents';
import { VARIANT } from './constants';
import {
  getTagAudienceProps,
  getTagFormatProps,
  getTagIndustryProps,
  getTagMediaProps,
  getTagPlatformProps,
  getTagPromoProps,
  TagAudienceProps,
  TagFormatProps,
  TagIndustryCaseProps,
  TagMediaProps,
  TagPlatformProps,
  TagPromoProps,
} from './helpers';
import { TagProps, Variant } from './types';

type TagPropsMap = {
  [VARIANT.audience]: TagAudienceProps;
  [VARIANT.format]: TagFormatProps;
  [VARIANT.platform]: TagPlatformProps;
  [VARIANT.media]: TagMediaProps;
  [VARIANT.industry]: TagIndustryCaseProps;
  [VARIANT.promo]: TagPromoProps;
};

export type TagPredefinedProps = WithSupportProps<ValueOf<TagPropsMap>>;

function getTagProps<T extends Variant>(variant: T, type: TagPropsMap[T]['type']): TagProps | null {
  switch (variant) {
    case 'audience':
      return getTagAudienceProps(type as TagAudienceProps['type']);
    case 'format':
      return getTagFormatProps(type as TagFormatProps['type']);
    case 'platform':
      return getTagPlatformProps(type as TagPlatformProps['type']);
    case 'media':
      return getTagMediaProps(type as TagMediaProps['type']);
    case 'industry':
      return getTagIndustryProps(type as TagIndustryCaseProps['type']);
    case 'promo':
      return getTagPromoProps(type as TagPromoProps['type']);
    default:
      return null;
  }
}

export function TagPredefined({ variant, className, type, ...props }: TagPredefinedProps) {
  const tagProps = getTagProps<typeof variant>(variant, type);

  if (!tagProps) return null;

  return <TagSpecial {...tagProps} appearance={tagProps.appearance ?? 'neutral'} className={className} {...props} />;
}
