import { ChipProps } from '../types';

const GAP = 8;

type GetVisibleChipsCountArgs = {
  containerWidth: number;
  chipWidths: number[];
  chips: ChipProps[];
  isSmall: boolean;
  isCloseChipExist: boolean;
};

export const getVisibleChipsCount = ({
  containerWidth,
  chipWidths,
  chips,
  isSmall,
  isCloseChipExist,
}: GetVisibleChipsCountArgs) => {
  if (containerWidth === 0 || chipWidths.length === 0) {
    return chips.length;
  }

  const baseIcon = (isSmall ? 40 : 32) + GAP;
  const closeIconWidth = isCloseChipExist ? baseIcon - GAP : 0;

  let availableWidth = Math.round(containerWidth) - baseIcon - closeIconWidth;
  let visibleCount = 0;
  let isCounterChipExist = false;
  let isCounterChipWidthSubstracted = false;
  const chipsWidthWithGap = chipWidths.map(chip => Math.round(chip + GAP));

  for (let i = 0; i < chipsWidthWithGap.length; i++) {
    const chipWidth = chipsWidthWithGap[i];

    if (availableWidth >= chipWidth) {
      if (isCounterChipExist && !isCounterChipWidthSubstracted) {
        availableWidth -= baseIcon;
        isCounterChipWidthSubstracted = true;
      }

      availableWidth -= chipWidth;
      visibleCount++;

      if (visibleCount === chipsWidthWithGap.length) {
        isCounterChipExist = false;
        isCounterChipWidthSubstracted = false;
      } else {
        isCounterChipExist = true;
      }
    } else {
      break;
    }
  }

  return Math.max(1, visibleCount);
};
