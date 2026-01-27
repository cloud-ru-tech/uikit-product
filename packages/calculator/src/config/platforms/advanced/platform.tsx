import { AdvancedPlatformSVG } from '@cloud-ru/uikit-product-icons';

import { PLATFORM } from '../../../constants';
import { Platform } from '../../../types';

export const ADVANCED_PLATFORM: Platform = {
  id: PLATFORM.Advanced,
  icon: <AdvancedPlatformSVG />,
  label: 'Advanced Cloud.ru',
  description: '60+ IaaS- и PaaS-сервисов для развития инфраструктуры',
  access: 'request',
  dataTestId: 'calculator-catalog-platform-advanced',
};
