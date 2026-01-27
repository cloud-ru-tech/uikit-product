import { LayoutType } from '@cloud-ru/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

export const getTitleProps = (layoutType: LayoutType): Pick<TypographyProps, 'purpose' | 'size'> => {
  switch (layoutType) {
    case 'mobile':
      return {
        purpose: 'headline',
        size: 's',
      };
    case 'tablet':
      return {
        purpose: 'headline',
        size: 'l',
      };
    default:
      return {
        purpose: 'display',
        size: 'm',
      };
  }
};
