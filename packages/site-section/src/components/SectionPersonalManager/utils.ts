import { LayoutType } from '@cloud-ru/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

export const getCardTitleTypographyProps = (layoutType: LayoutType): Pick<TypographyProps, 'purpose' | 'size'> => {
  switch (layoutType) {
    case 'mobile':
    case 'tablet':
      return { purpose: 'title', size: 'm' };

    case 'desktop':
    case 'desktopSmall':
    default:
      return { purpose: 'headline', size: 's' };
  }
};
