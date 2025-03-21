import { LayoutType } from '@sbercloud/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

export function getTitleTypographyProps(layoutType: LayoutType): Pick<TypographyProps, 'purpose' | 'size'> {
  switch (layoutType) {
    case 'mobile':
    case 'tablet':
      return { purpose: 'headline', size: 's' };

    case 'desktop':
    case 'desktopSmall':
    default:
      return { purpose: 'headline', size: 'l' };
  }
}
