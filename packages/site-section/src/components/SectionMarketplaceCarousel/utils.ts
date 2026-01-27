import { LayoutType } from '@cloud-ru/uikit-product-utils';
import { themeVars } from '@snack-uikit/figma-tokens';

import { SectionCarouselProps } from '../../helperComponents';

export const getCarouselProps = (
  layoutType: LayoutType,
): Pick<SectionCarouselProps, 'itemMinWidth' | 'maxItemsPerPage' | 'gap'> => {
  switch (layoutType) {
    case 'mobile':
      return {
        itemMinWidth: 270,
        maxItemsPerPage: 1,
        gap: themeVars.dimension['2m'],
      };

    case 'tablet':
      return {
        itemMinWidth: 270,
        maxItemsPerPage: 2,
        gap: themeVars.dimension['2m'],
      };

    case 'desktop':
    case 'desktopSmall':
    default:
      return {
        itemMinWidth: 380,
        maxItemsPerPage: 3,
        gap: themeVars.dimension['3m'],
      };
  }
};
