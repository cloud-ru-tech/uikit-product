import { LayoutType } from '@cloud-ru/uikit-product-utils';

import { BannerCommon, BannerCommonProps } from '../../helperComponents/BannerCommon';
import { BetterOmit } from '../../types';

export type BannerSecondaryProps = BetterOmit<BannerCommonProps, 'topSlot' | 'sizes'>;

const IMAGE_PADDING = 8;
const IMAGE_SIZE = [303 - IMAGE_PADDING * 2, 208 - IMAGE_PADDING * 2] as [number, number];

const getGapValue = (layouType: LayoutType) => (layouType === 'tablet' ? 32 : 24);

export function BannerSecondary(props: BannerSecondaryProps) {
  return (
    <BannerCommon
      topSlot={null}
      sizes={{ image: IMAGE_SIZE, mainGap: getGapValue(props.layoutType), imagePadding: IMAGE_PADDING }}
      {...props}
    />
  );
}
