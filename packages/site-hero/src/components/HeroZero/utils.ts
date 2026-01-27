import { LayoutType } from '@cloud-ru/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

export const getTitleTypographyProps = (layoutType: LayoutType): Pick<TypographyProps, 'size' | 'purpose'> => {
  switch (layoutType) {
    case 'tablet':
    case 'mobile':
      return { purpose: 'headline', size: 'l' };

    case 'desktop':
    case 'desktopSmall':
    default:
      return { purpose: 'display', size: 'm' };
  }
};
