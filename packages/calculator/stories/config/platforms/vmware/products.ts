import { CatalogConfig, PLATFORM } from '@sbercloud/uikit-product-calculator';
import { VmManagerSVG } from '@sbercloud/uikit-product-icons';

import { VM_WARE_PRODUCT } from './constants';
import { VIRTUAL_DATA_CENTER_FORM_CONFIG } from './product-config';

export const VM_WARE_PRODUCTS: CatalogConfig['products'] = {
  [VM_WARE_PRODUCT.VmWareVirtualDataCenter]: {
    id: VM_WARE_PRODUCT.VmWareVirtualDataCenter,
    platform: PLATFORM.VmWare,
    dataTestId: VM_WARE_PRODUCT.VmWareVirtualDataCenter,
    label: 'VMware: Виртуальный ЦОД',
    caption: 'Публичное облако на базе VMware',
    formConfig: VIRTUAL_DATA_CENTER_FORM_CONFIG,
    icon: VmManagerSVG,
    enableChangeProductQuantity: false,
    hasPayaGo: true,
  },
};
