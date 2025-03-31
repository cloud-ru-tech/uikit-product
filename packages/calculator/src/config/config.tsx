import { CatalogConfig } from '../types';
import { ADVANCED_CATALOG, ADVANCED_PLATFORM, ADVANCED_PRODUCT, ADVANCED_PRODUCTS } from './platforms/advanced';
import { EVOLUTION_CATALOG, EVOLUTION_PLATFORM, EVOLUTION_PRODUCT, EVOLUTION_PRODUCTS } from './platforms/evolution';
import { VM_WARE_CATALOG, VM_WARE_PLATFORM, VM_WARE_PRODUCT, VM_WARE_PRODUCTS } from './platforms/vmware';

export type ValueOf<T> = T[keyof T];

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

export type ProductType =
  | ValueOf<typeof ADVANCED_PRODUCT>
  | ValueOf<typeof VM_WARE_PRODUCT>
  | ValueOf<typeof EVOLUTION_PRODUCT>;
