import {
  AdvancedPlatformSVG,
  EnterprisePlatformSVG,
  EvolutionPlatformSVG,
  MlSpacePlatformSVG,
} from '@sbercloud/uikit-product-icons';

import { getPlatformIconComponent } from './Container';

export const AdvancedPlatformLogo = getPlatformIconComponent(AdvancedPlatformSVG, 'advanced');
export const EnterprisePlatformLogo = getPlatformIconComponent(EnterprisePlatformSVG, 'enterprise');
export const EvolutionPlatformLogo = getPlatformIconComponent(EvolutionPlatformSVG, 'evolution');
export const MLSpacePlatformLogo = getPlatformIconComponent(MlSpacePlatformSVG, 'mlspace');
