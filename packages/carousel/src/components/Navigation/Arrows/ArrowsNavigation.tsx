import { ButtonOverlay } from '@sbercloud/uikit-react-button';
import { ArrowBoldLeftInterfaceSVG, ArrowBoldRightInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { ActionTypes } from '../../Carousel';
import { ArrowsWrap } from './styled';

export type ArrowsProps = {
  onArrowClick: (action: ActionTypes) => void;
  idx: number;
  itemsAmount: number;
  tooltipContent?: string;
  disabledTooltipContent?: string;
};

export function ArrowsNavigation({
  onArrowClick,
  idx,
  itemsAmount,
  tooltipContent,
  disabledTooltipContent,
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

  return (
    <ArrowsWrap>
      <ButtonOverlay
        tooltip={{ content: tooltipContent, placement: ButtonOverlay.placements.Bottom }}
        disabledTooltip={{ content: disabledTooltipContent, placement: ButtonOverlay.placements.Bottom }}
        disabled={isLeftArrowDisabled}
        icon={<ArrowBoldLeftInterfaceSVG />}
        onClick={() => handleArrowClick(ActionTypes.Decr)}
      />
      <ButtonOverlay
        tooltip={{ content: tooltipContent, placement: ButtonOverlay.placements.Top }}
        disabledTooltip={{ content: disabledTooltipContent, placement: ButtonOverlay.placements.Top }}
        disabled={isRightArrowDisabled}
        icon={<ArrowBoldRightInterfaceSVG />}
        onClick={() => handleArrowClick(ActionTypes.Incr)}
      />
    </ArrowsWrap>
  );
}
