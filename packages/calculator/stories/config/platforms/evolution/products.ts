import { CatalogConfig, PLATFORM } from '@sbercloud/uikit-product-calculator';
import { BareMetalSVG, EvolutionComputeSVG, S3StorageSVG } from '@sbercloud/uikit-product-icons';

import { EVOLUTION_PRODUCT } from './constants';
import {
  EVOLUTION_BARE_METAL_FORM_CONFIG,
  EVOLUTION_CLOUD_SERVER_FREE_TIER_FORM_CONFIG,
  EVOLUTION_STORAGE_S3_FREE_TIER_FORM_CONFIG,
} from './product-config';

export const EVOLUTION_PRODUCTS: CatalogConfig['products'] = {
  [EVOLUTION_PRODUCT.EvolutionCloudServerFreeTier]: {
    id: EVOLUTION_PRODUCT.EvolutionCloudServerFreeTier,
    platform: PLATFORM.Evolution,
    label: 'Evolution Compute Free Tier',
    caption: 'Бесплатная виртуальная машина в заданной конфигурации',
    formConfig: EVOLUTION_CLOUD_SERVER_FREE_TIER_FORM_CONFIG,
    icon: EvolutionComputeSVG,
    dataTestId: 'evolutionCloudServerFreeTier',
    freeTier: true,
    enableConnectToConsole: true,
  },
  [EVOLUTION_PRODUCT.EvolutionStorageS3FreeTier]: {
    id: EVOLUTION_PRODUCT.EvolutionStorageS3FreeTier,
    platform: PLATFORM.Evolution,
    label: 'Evolution Object Storage Free Tier',
    caption: 'Ежемесячный объем бесплатных ресурсов в хранилище',
    icon: S3StorageSVG,
    dataTestId: 'evolutionStorageS3FreeTier',
    formConfig: EVOLUTION_STORAGE_S3_FREE_TIER_FORM_CONFIG,
    enableConnectToConsole: true,
    freeTier: true,
  },
  [EVOLUTION_PRODUCT.EvolutionBareMetal]: {
    id: EVOLUTION_PRODUCT.EvolutionBareMetal,
    platform: PLATFORM.Evolution,
    label: 'Evolution Bare Metal',
    caption: 'Сервис аренды физических серверов с доступом и управлением только для вас',
    icon: BareMetalSVG,
    formConfig: EVOLUTION_BARE_METAL_FORM_CONFIG,
    dataTestId: EVOLUTION_PRODUCT.EvolutionBareMetal,
    enableChangeProductQuantity: false,
    enableConnectToConsole: true,
  },
};
