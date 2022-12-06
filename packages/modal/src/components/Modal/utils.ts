import { FooterAlign, HeaderAlign } from '@sbercloud/uikit-product-modal-private';

import { Align } from './constants';

export function getAlignProps(align: Align) {
  switch (align) {
    case Align.Center: {
      return {
        headerAlign: HeaderAlign.Center,
        footerAlign: FooterAlign.Center,
      };
    }

    default: {
      return {
        headerAlign: HeaderAlign.Left,
        footerAlign: FooterAlign.Right,
      };
    }
  }
}
