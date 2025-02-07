import { LayoutType } from '@sbercloud/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

export const getTitleTypographyProps = (layoutType: LayoutType): Pick<TypographyProps, 'size' | 'purpose'> => {
  switch (layoutType) {
    case 'mobile':
      return { purpose: 'headline', size: 'm' };

    case 'tablet':
      return { purpose: 'headline', size: 'l' };

    case 'desktop':
    case 'desktopSmall':
    default:
      return { purpose: 'display', size: 'm' };
  }
};
