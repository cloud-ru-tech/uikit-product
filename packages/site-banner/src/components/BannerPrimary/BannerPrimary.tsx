import { TagSpecial, TagSpecialProps } from '@sbercloud/uikit-product-site-tag';
import { LAYOUT_TYPE, LayoutType } from '@sbercloud/uikit-product-utils';
import { PromoTag } from '@snack-uikit/promo-tag';

import { BannerCommon, BannerCommonProps } from '../../helperComponents/BannerCommon';
import { BetterOmit } from '../../types';
import styles from './styles.module.scss';

export type BannerPrimaryProps = BetterOmit<BannerCommonProps, 'sizes'> & {
  imgType: 'rectangle' | 'square';
  /** Дата окончания действия */
  expirationDate?: string;
  /** Тэги */
  tags?: TagSpecialProps[];
};

const IMAGE_SIZE: Record<LayoutType, Record<'rectangle' | 'square', [number, number]>> = {
  [LAYOUT_TYPE.Desktop]: { rectangle: [396, 272], square: [272, 272] },
  [LAYOUT_TYPE.DesktopSmall]: { rectangle: [396, 272], square: [272, 272] },
  [LAYOUT_TYPE.Tablet]: { rectangle: [396, 272], square: [272, 272] },
  [LAYOUT_TYPE.Mobile]: { rectangle: [360, 247], square: [272, 272] },
};

export function BannerPrimary({ tags, imgType, layoutType, expirationDate, ...props }: BannerPrimaryProps) {
  return (
    <BannerCommon
      sizes={{ image: IMAGE_SIZE[layoutType][imgType], mainGap: layoutType === 'mobile' ? 24 : 32 }}
      layoutType={layoutType}
      topSlot={
        (tags || expirationDate) && (
          <div className={styles.tags}>
            {expirationDate && (
              <PromoTag
                size='xs'
                text={`Действует до ${expirationDate}`}
                appearance='neutral'
                color='decor'
                className={styles.promoTag}
              />
            )}

            {tags?.map((props, index) => (
              <TagSpecial key={index} {...props} />
            ))}
          </div>
        )
      }
      {...props}
    />
  );
}
