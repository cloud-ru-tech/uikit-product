import { LayoutType } from '@sbercloud/uikit-product-utils';

import { SectionCarouselProps } from '../../helperComponents';

export const getCarouselProps = (
  layoutType: LayoutType,
): Pick<SectionCarouselProps, 'itemMinWidth' | 'maxItemsPerPage'> => {
  switch (layoutType) {
    case 'mobile':
      return {
        itemMinWidth: 270,
        maxItemsPerPage: 1,
      };

    case 'tablet':
      return {
        itemMinWidth: 340,
        maxItemsPerPage: 2,
      };

    case 'desktop':
    case 'desktopSmall':
    default:
      return {
        itemMinWidth: 340,
        maxItemsPerPage: 3,
      };
  }
};
