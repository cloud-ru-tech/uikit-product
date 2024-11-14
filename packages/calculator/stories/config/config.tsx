import { CatalogConfig } from '@sbercloud/uikit-product-calculator';

import { ADVANCED_CATALOG, ADVANCED_PLATFORM, ADVANCED_PRODUCTS } from './platforms/advanced';
import { EVOLUTION_CATALOG, EVOLUTION_PLATFORM, EVOLUTION_PRODUCTS } from './platforms/evolution';
import { VM_WARE_CATALOG, VM_WARE_PLATFORM, VM_WARE_PRODUCTS } from './platforms/vmware';

export const CATALOG_CONFIG: CatalogConfig = {
  platforms: [EVOLUTION_PLATFORM, ADVANCED_PLATFORM, VM_WARE_PLATFORM],

  products: {
    ...EVOLUTION_PRODUCTS,
    ...ADVANCED_PRODUCTS,
    ...VM_WARE_PRODUCTS,
  },

  catalog: {
    ...EVOLUTION_CATALOG,
    ...ADVANCED_CATALOG,
    ...VM_WARE_CATALOG,
  },
};
