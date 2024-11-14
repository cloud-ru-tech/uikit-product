import { CatalogConfig, PLATFORM } from '@sbercloud/uikit-product-calculator';
import { CloudBackupAndRecoverySapSVG, DistributedCacheServiceForMemcachedSVG } from '@sbercloud/uikit-product-icons';

import { ADVANCED_PRODUCT } from './constants';
import { CLOUD_BACKUP_FORM_CONFIG, DSC_MEMCACHED_FORM_CONFIG } from './product-config';

export const ADVANCED_PRODUCTS: CatalogConfig['products'] = {
  [ADVANCED_PRODUCT.AdvancedDcsMemcached]: {
    id: ADVANCED_PRODUCT.AdvancedDcsMemcached,
    platform: PLATFORM.Advanced,
    dataTestId: ADVANCED_PRODUCT.AdvancedDcsMemcached,
    formConfig: DSC_MEMCACHED_FORM_CONFIG,
    label: 'Advanced Distributed Cache Service for Memcached',
    caption: 'Кеширование данных в памяти на базе Memcached',
    icon: DistributedCacheServiceForMemcachedSVG,
    enableChangeProductQuantity: false,
  },
  [ADVANCED_PRODUCT.AdvancedCloudBackup]: {
    id: ADVANCED_PRODUCT.AdvancedCloudBackup,
    platform: PLATFORM.Advanced,
    dataTestId: ADVANCED_PRODUCT.AdvancedCloudBackup,
    label: 'Advanced Cloud Backup and Recovery',
    caption: 'Резервное копирование облачных дисков и серверов',
    formConfig: CLOUD_BACKUP_FORM_CONFIG,
    icon: CloudBackupAndRecoverySapSVG,
    enableChangeProductQuantity: false,
  },
};
