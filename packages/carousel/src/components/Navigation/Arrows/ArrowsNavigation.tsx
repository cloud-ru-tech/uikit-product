import { useMemo } from 'react';

import { ButtonOverlay } from '@sbercloud/uikit-product-button';
import { ArrowBoldLeftInterfaceSVG, ArrowBoldRightInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { getTooltipsSettings } from '../../../helpers';
import { TooltipsSettings } from '../../../types';
import { ActionTypes } from '../../Carousel';
import { ArrowsWrap } from './styled';

export type ArrowsProps = {
  onArrowClick: (action: ActionTypes) => void;
  idx: number;
  itemsAmount: number;
  prevButtonTooltips?: TooltipsSettings;
  nextButtonTooltips?: TooltipsSettings;
};

export function ArrowsNavigation({
  onArrowClick,
  idx,
  itemsAmount,
  prevButtonTooltips,
  nextButtonTooltips,
}: ArrowsProps) {
  const isLeftArrowDisabled = idx <= 0;
  const isRightArrowDisabled = idx >= itemsAmount - 1;

  const handleArrowClick = (action: ActionTypes) => {
    if (action === ActionTypes.Incr) {
      !isRightArrowDisabled && onArrowClick(ActionTypes.Incr);
    } else {
      !isLeftArrowDisabled && onArrowClick(ActionTypes.Decr);
    }
  };

  const prevTooltips = useMemo(
    () => getTooltipsSettings(prevButtonTooltips, ButtonOverlay.placements.Bottom),
    [prevButtonTooltips],
  );
  const nextTooltips = useMemo(
    () => getTooltipsSettings(nextButtonTooltips, ButtonOverlay.placements.Bottom),
    [nextButtonTooltips],
  );

  return (
    <ArrowsWrap>
      <ButtonOverlay
        {...prevTooltips}
        disabled={isLeftArrowDisabled}
        icon={<ArrowBoldLeftInterfaceSVG />}
        onClick={() => handleArrowClick(ActionTypes.Decr)}
      />
      <ButtonOverlay
        {...nextTooltips}
        disabled={isRightArrowDisabled}
        icon={<ArrowBoldRightInterfaceSVG />}
        onClick={() => handleArrowClick(ActionTypes.Incr)}
      />
    </ArrowsWrap>
  );
}
