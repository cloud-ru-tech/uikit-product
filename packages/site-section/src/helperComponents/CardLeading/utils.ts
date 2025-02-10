import { LayoutType } from '@sbercloud/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

export const getValueTypographyProps = (layoutType: LayoutType): Pick<TypographyProps, 'purpose' | 'size'> => {
  switch (layoutType) {
    case 'mobile':
    case 'tablet':
      return { purpose: 'headline', size: 'l' };

    case 'desktop':
    case 'desktopSmall':
    default:
      return { purpose: 'display', size: 'l' };
  }
};

export const getLabelTypographyProps = (layoutType: LayoutType): Pick<TypographyProps, 'purpose' | 'size'> => {
  switch (layoutType) {
    case 'mobile':
    case 'tablet':
      return { purpose: 'label', size: 'l' };

    case 'desktop':
    case 'desktopSmall':
    default:
      return { purpose: 'title', size: 'm' };
  }
};
