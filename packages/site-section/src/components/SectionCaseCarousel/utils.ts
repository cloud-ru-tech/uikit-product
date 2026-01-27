import { LayoutType } from '@cloud-ru/uikit-product-utils';

import { SectionCarouselProps } from '../../helperComponents';

export const getCarouselProps = (
  layoutType: LayoutType,
): Pick<SectionCarouselProps, 'itemMinWidth' | 'maxItemsPerPage'> => {
  switch (layoutType) {
    case 'tablet':
    case 'mobile':
      return {
        itemMinWidth: 270,
        maxItemsPerPage: 1,
      };

    case 'desktop':
    case 'desktopSmall':
    default:
      return {
        itemMinWidth: 320,
        maxItemsPerPage: 2,
      };
  }
};
