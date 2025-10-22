import { forwardRef, MouseEventHandler, ReactNode, RefObject } from 'react';

import { AgentClaudiaSVG } from '@sbercloud/uikit-product-icons';
import { LAYOUT_TYPE, LayoutType } from '@sbercloud/uikit-product-utils';
import { Tooltip } from '@snack-uikit/tooltip';

import { ButtonClaudia } from '../../../ButtonClaudia';
import { Size } from '../../types';

type ClaudiaChipProps = {
  onClick?: MouseEventHandler<HTMLElement>;
  size: Size;
  tooltip?: ReactNode;
  layoutType?: LayoutType;
};

export const ClaudiaChip = forwardRef<HTMLElement | HTMLButtonElement, ClaudiaChipProps>(
  ({ onClick, size, tooltip, layoutType }, ref) => {
    const isMobile = layoutType === LAYOUT_TYPE.Mobile || size === Size.M;
    const totalSize = isMobile ? Size.M : size;

    if (!tooltip) {
      return (
        <ButtonClaudia
          size={totalSize}
          data-mobile={isMobile}
          ref={ref as RefObject<HTMLButtonElement>}
          onClick={onClick}
          icon={<AgentClaudiaSVG size={24} />}
        />
      );
    }

    return (
      <Tooltip triggerRef={ref as RefObject<HTMLElement>} tip={tooltip}>
        <ButtonClaudia size={totalSize} data-mobile={isMobile} onClick={onClick} icon={<AgentClaudiaSVG size={24} />} />
      </Tooltip>
    );
  },
);
