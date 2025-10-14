import { LayoutType } from '@sbercloud/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

export function getValueTypographyProps(layoutType: LayoutType): Pick<TypographyProps, 'purpose' | 'size'> {
  switch (layoutType) {
    case 'mobile':
    case 'tablet':
      return { purpose: 'display', size: 's' };

    case 'desktop':
    case 'desktopSmall':
    default:
      return { purpose: 'display', size: 'l' };
  }
}

export function getValueTypographySubtitleProps(layoutType: LayoutType): Pick<TypographyProps, 'purpose' | 'size'> {
  switch (layoutType) {
    case 'mobile':
    case 'tablet':
      return { purpose: 'title', size: 'm' };

    case 'desktop':
    case 'desktopSmall':
    default:
      return { purpose: 'headline', size: 's' };
  }
}
