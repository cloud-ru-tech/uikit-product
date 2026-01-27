import { LayoutType } from '@cloud-ru/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

export const getTypographySize = (layoutType: LayoutType, size?: 's' | 'm' | 'l'): TypographyProps['size'] => {
  if (size === 's') {
    switch (layoutType) {
      case 'tablet':
      case 'mobile':
        return 's';

      default:
        return 'm';
    }
  }
  switch (layoutType) {
    case 'tablet':
    case 'mobile':
      return 'm';

    default:
      return 'l';
  }
};
