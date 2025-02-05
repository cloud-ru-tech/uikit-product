import { CATEGORY, PLATFORM } from '../../../constants';
import { CatalogConfig } from '../../../types';
import { VM_WARE_PRODUCT } from './constants';

export const VM_WARE_CATALOG: CatalogConfig['catalog'] = {
  [PLATFORM.VmWare]: [
    {
      id: CATEGORY.Popular,
      label: 'Популярное',
      dataTestId: 'popular',
      visibleProducts: [
        VM_WARE_PRODUCT.VmWareVirtualDataCenter,
        VM_WARE_PRODUCT.VmWareCloudBackup,
        VM_WARE_PRODUCT.VmWareVirtualMachinesBackup,
      ],
    },
  ],
};
