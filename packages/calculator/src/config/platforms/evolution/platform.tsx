import { EvolutionSVG } from '@sbercloud/uikit-product-icons';

import { PLATFORM } from '../../../constants';
import { Platform } from '../../../types';

export const EVOLUTION_PLATFORM: Platform = {
  id: PLATFORM.Evolution,
  icon: <EvolutionSVG />,
  label: 'Evolution Cloud.ru',
  description: 'Публичное российское облако на базе open source',
  access: 'public',
  dataTestId: 'calculator-catalog-platform-evolution',
};
