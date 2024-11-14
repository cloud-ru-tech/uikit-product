import { CatalogConfig, CATEGORY, PLATFORM } from '@sbercloud/uikit-product-calculator';

import { VM_WARE_PRODUCT } from './constants';

export const VM_WARE_CATALOG: CatalogConfig['catalog'] = {
  [PLATFORM.VmWare]: [
    {
      id: CATEGORY.Popular,
      label: 'Популярное',
      dataTestId: 'popular',
      visibleProducts: [VM_WARE_PRODUCT.VmWareVirtualDataCenter],
    },
  ],
};
