import { LayoutType } from '@cloud-ru/uikit-product-utils';

export const getIconSize = (layoutType: LayoutType) => {
  switch (layoutType) {
    case 'tablet':
    case 'mobile':
      return 'm';

    case 'desktop':
    case 'desktopSmall':
    default:
      return 'l';
  }
};
