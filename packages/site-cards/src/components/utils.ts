import { LayoutType } from '@cloud-ru/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

export function noop() {}

export const getTypographySize = (layoutType: LayoutType): TypographyProps['size'] => {
  switch (layoutType) {
    case 'tablet':
    case 'mobile':
      return 'm';

    default:
      return 'l';
  }
};
