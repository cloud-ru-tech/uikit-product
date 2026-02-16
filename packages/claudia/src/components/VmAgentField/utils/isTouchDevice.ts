import { LayoutType } from '@cloud-ru/uikit-product-utils';

export function isTouchDevice(layoutType: LayoutType) {
  return ['mobile', 'tablet'].includes(layoutType);
}
