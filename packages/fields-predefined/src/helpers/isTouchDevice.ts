import { LayoutType } from '@sbercloud/uikit-product-utils';

export function isTouchDevice(layoutType: LayoutType) {
  return ['mobile', 'tablet'].includes(layoutType);
}
