import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

import { Size } from './types';

type Props = WithLayoutType<{
  titleSectionSize: Size;
}>;

export const getTitleTypographyProps = ({
  layoutType,
  titleSectionSize,
}: Props): Pick<TypographyProps, 'size' | 'purpose'> => {
  switch (layoutType) {
    case 'tablet':
      switch (titleSectionSize) {
        case 'l':
          return {
            purpose: 'headline',
            size: 'l',
          };

        case 's':
          return {
            purpose: 'title',
            size: 'l',
          };

        case 'm':
        default:
          return {
            purpose: 'headline',
            size: 'm',
          };
      }

    case 'mobile':
      switch (titleSectionSize) {
        case 'l':
          return {
            purpose: 'headline',
            size: 'm',
          };

        case 's':
          return {
            purpose: 'title',
            size: 'm',
          };

        case 'm':
        default:
          return {
            purpose: 'title',
            size: 'l',
          };
      }

    case 'desktop':
    case 'desktopSmall':
    default:
      switch (titleSectionSize) {
        case 'l':
          return {
            purpose: 'display',
            size: 'm',
          };

        case 's':
          return {
            purpose: 'headline',
            size: 's',
          };

        case 'm':
        default:
          return {
            purpose: 'headline',
            size: 'l',
          };
      }
  }
};
