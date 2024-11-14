import { PLATFORM, Platform } from '@sbercloud/uikit-product-calculator';
import { EvolutionSVG } from '@sbercloud/uikit-product-icons';

export const EVOLUTION_PLATFORM: Platform = {
  id: PLATFORM.Evolution,
  icon: <EvolutionSVG />,
  label: 'Evolution Cloud.ru',
  description: 'Публичное российское облако на базе open source',
  access: 'public',
  dataTestId: 'calculator-catalog-platform-evolution',
};
