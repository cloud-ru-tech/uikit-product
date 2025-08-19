import {
  BackupSVG,
  VirtualDataCenterWithGpuSVG,
  VirtualDesktopInfrastructureSVG,
  VmBackupSVG,
} from '@sbercloud/uikit-product-icons';

import { PLATFORM } from '../../../constants';
import { CatalogConfig } from '../../../types';
import { VM_WARE_PRODUCT } from './constants';
import {
  VIRTUAL_DATA_CENTER_FORM_CONFIG,
  VM_WARE_CLOUD_BACKUP_FORM_CONFIG,
  VM_WARE_VIRTUAL_MACHINES_BACKUP_FORM_CONFIG,
  VM_WARE_VIRTUAL_WORKSPACES_FORM_CONFIG,
} from './product-config';

export const VM_WARE_PRODUCTS: CatalogConfig['products'] = {
  [VM_WARE_PRODUCT.VmWareVirtualDataCenter]: {
    id: VM_WARE_PRODUCT.VmWareVirtualDataCenter,
    platform: PLATFORM.VmWare,
    dataTestId: VM_WARE_PRODUCT.VmWareVirtualDataCenter,
    label: 'VMware: Виртуальный ЦОД',
    caption: 'Публичное облако на базе VMware',
    formConfig: VIRTUAL_DATA_CENTER_FORM_CONFIG,
    icon: VirtualDataCenterWithGpuSVG,
    enableChangeProductQuantity: false,
    hasPayaGo: true,
  },
  [VM_WARE_PRODUCT.VmWareCloudBackup]: {
    id: VM_WARE_PRODUCT.VmWareCloudBackup,
    platform: PLATFORM.VmWare,
    dataTestId: VM_WARE_PRODUCT.VmWareCloudBackup,
    label: 'VMware: резервное копирование в облако',
    caption: 'Защита от потери данных, кибератак и сбоев приложений',
    formConfig: VM_WARE_CLOUD_BACKUP_FORM_CONFIG,
    icon: BackupSVG,
    enableChangeProductQuantity: false,
    hasPayaGo: true,
  },
  [VM_WARE_PRODUCT.VmWareVirtualMachinesBackup]: {
    id: VM_WARE_PRODUCT.VmWareVirtualMachinesBackup,
    platform: PLATFORM.VmWare,
    dataTestId: VM_WARE_PRODUCT.VmWareVirtualMachinesBackup,
    label: 'VMware: резервное копирование виртуальных машин',
    caption: 'Сервис по созданию резервных копий, восстановлению виртуальных машин и отдельных файлов',
    formConfig: VM_WARE_VIRTUAL_MACHINES_BACKUP_FORM_CONFIG,
    icon: VmBackupSVG,
    enableChangeProductQuantity: false,
    hasPayaGo: true,
  },
  [VM_WARE_PRODUCT.VmWareVirtualWorkspaces]: {
    id: VM_WARE_PRODUCT.VmWareVirtualWorkspaces,
    platform: PLATFORM.VmWare,
    dataTestId: VM_WARE_PRODUCT.VmWareVirtualWorkspaces,
    label: 'VMware: Удаленные рабочие столы (VDI)',
    caption: 'Виртуальные рабочие столы на платформе Облако VMware',
    formConfig: VM_WARE_VIRTUAL_WORKSPACES_FORM_CONFIG,
    icon: VirtualDesktopInfrastructureSVG,
    enableChangeProductQuantity: false,
    hasPayaGo: true,
  },
};
