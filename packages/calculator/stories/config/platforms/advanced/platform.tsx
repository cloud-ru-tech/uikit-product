import { PLATFORM, Platform } from '@sbercloud/uikit-product-calculator';
import { AdvancedPlatformSVG } from '@sbercloud/uikit-product-icons';

export const ADVANCED_PLATFORM: Platform = {
  id: PLATFORM.Advanced,
  icon: <AdvancedPlatformSVG />,
  label: 'Advanced Cloud.ru',
  description: '60+ IaaS- и PaaS-сервисов для развития инфраструктуры',
  access: 'request',
  dataTestId: 'calculator-catalog-platform-advanced',
};
