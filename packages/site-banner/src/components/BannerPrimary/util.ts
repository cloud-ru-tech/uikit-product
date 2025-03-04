import { LayoutType } from '@sbercloud/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

export const getBlockTitleProps = (layoutType: LayoutType): Pick<TypographyProps, 'purpose' | 'size'> => {
  switch (layoutType) {
    case 'mobile':
      return {
        purpose: 'title',
        size: 'm',
      };
    case 'tablet':
      return {
        purpose: 'title',
        size: 'l',
      };
    default:
      return {
        purpose: 'headline',
        size: 'm',
      };
  }
};
