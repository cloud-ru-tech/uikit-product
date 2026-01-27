import { LAYOUT_TYPE, WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { PURPOSE, SIZE, TypographyProps } from '@snack-uikit/typography';

type Props = WithLayoutType<unknown>;

export const getTitleTypographyProps = ({ layoutType }: Props): Pick<TypographyProps, 'size' | 'purpose'> => {
  switch (layoutType) {
    case LAYOUT_TYPE.Mobile:
    case LAYOUT_TYPE.Tablet:
      return {
        purpose: PURPOSE.Title,
        size: SIZE.L,
      };
    case LAYOUT_TYPE.Desktop:
    case LAYOUT_TYPE.DesktopSmall:
    default:
      return {
        purpose: PURPOSE.Headline,
        size: SIZE.S,
      };
  }
};

export const getTitleTruncateMaxLines = ({ layoutType }: Props): number => {
  switch (layoutType) {
    case LAYOUT_TYPE.Mobile:
      return 5;
    case LAYOUT_TYPE.Tablet:
      return 3;
    case LAYOUT_TYPE.Desktop:
    case LAYOUT_TYPE.DesktopSmall:
    default:
      return 2;
  }
};
