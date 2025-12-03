import { LayoutType } from '@sbercloud/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

import { HERO_COLORS } from '../../constants';
import { HeroColor } from '../../types';

export const getTitleTypographyProps = (layoutType: LayoutType): Pick<TypographyProps, 'size' | 'purpose'> => {
  switch (layoutType) {
    case 'mobile':
      return { purpose: 'headline', size: 'm' };

    case 'tablet':
      return { purpose: 'headline', size: 'l' };

    case 'desktop':
    case 'desktopSmall':
    default:
      return { purpose: 'display', size: 'm' };
  }
};

export const getAppearanceByBackground = (backgroundColor: HeroColor): 'neutral' | 'invert-neutral' =>
  backgroundColor === HERO_COLORS.GraphiteAccentDefault ? 'invert-neutral' : 'neutral';

export const getNavbarAppearanceByBackground = (backgroundColor: HeroColor) =>
  backgroundColor === HERO_COLORS.GraphiteAccentDefault
    ? { colorText: 'invert' as const, dividerBackgroundColor: 'invert' as const }
    : { colorText: 'neutral' as const, dividerBackgroundColor: 'neutral' as const };
