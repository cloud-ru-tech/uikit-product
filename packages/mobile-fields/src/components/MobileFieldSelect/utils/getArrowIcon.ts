import { JSXElementConstructor } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@sbercloud/uikit-product-icons';
import { ICON_SIZE, SIZE, Size } from '@snack-uikit/input-private';
import { ValueOf } from '@snack-uikit/utils';

export function getArrowIcon({ size, open }: { size: Size; open: boolean }): {
  ArrowIcon: JSXElementConstructor<{ className?: string; size: ValueOf<typeof ICON_SIZE> }>;
  arrowIconSize: ValueOf<typeof ICON_SIZE>;
} {
  return {
    ArrowIcon: open ? ChevronUpSVG : ChevronDownSVG,
    arrowIconSize: size === SIZE.S ? ICON_SIZE.Xs : ICON_SIZE.S,
  };
}
