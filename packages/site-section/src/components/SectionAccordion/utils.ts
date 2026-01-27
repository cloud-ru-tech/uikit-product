import { LayoutType } from '@cloud-ru/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

export const getBlockTitleProps = (layoutType: LayoutType): Pick<TypographyProps, 'purpose' | 'size'> => {
  switch (layoutType) {
    case 'tablet':
    case 'mobile':
      return {
        purpose: 'title',
        size: 'm',
      };

    default:
      return {
        purpose: 'headline',
        size: 's',
      };
  }
};

export const getBlockDescriptionSize = (layoutType: LayoutType): TypographyProps['size'] => {
  switch (layoutType) {
    case 'tablet':
    case 'mobile':
      return 'm';
    default:
      return 'l';
  }
};
