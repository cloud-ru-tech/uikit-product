import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

type Props = WithLayoutType<{
  titleSectionSize: 's' | 'm' | 'l';
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
