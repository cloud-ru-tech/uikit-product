import { CatalogConfig, CATEGORY, PLATFORM } from '@sbercloud/uikit-product-calculator';

import { ADVANCED_PRODUCT } from './constants';

export const ADVANCED_CATALOG: CatalogConfig['catalog'] = {
  [PLATFORM.Advanced]: [
    {
      id: CATEGORY.Popular,
      label: 'Популярное',
      dataTestId: 'popular',
      visibleProducts: [ADVANCED_PRODUCT.AdvancedCloudBackup, ADVANCED_PRODUCT.AdvancedDcsMemcached],
    },
    {
      id: CATEGORY.Storage,
      label: 'Хранилище',
      dataTestId: 'storage',
      visibleProducts: [ADVANCED_PRODUCT.AdvancedCloudBackup],
    },

    {
      id: CATEGORY.Development,
      label: 'Разработка',
      dataTestId: 'development',
      visibleProducts: [ADVANCED_PRODUCT.AdvancedDcsMemcached],
    },
  ],
};
