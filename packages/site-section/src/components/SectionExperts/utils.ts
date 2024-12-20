import { LayoutType } from '@sbercloud/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

const EXPERT_MINIMAL_WIDTH = 240;
const MAX_PER_PAGE = 4;

export const calculateAmountOfItemsPerPage = (wrapperWidth: number): number => {
  const amount = Math.floor(wrapperWidth / EXPERT_MINIMAL_WIDTH);
  return amount > MAX_PER_PAGE ? MAX_PER_PAGE : amount;
};

export const getSectionTitleProps = (layoutType: LayoutType): Pick<TypographyProps, 'purpose' | 'size'> => {
  switch (layoutType) {
    case 'tablet':
      return {
        purpose: 'headline',
        size: 'm',
      };
    case 'mobile':
      return {
        purpose: 'title',
        size: 'l',
      };

    case 'desktop':
    case 'desktopSmall':
    default:
      return {
        purpose: 'headline',
        size: 'l',
      };
  }
};
