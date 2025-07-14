import { LayoutType } from '../types/adaptive';
import { getAdaptive } from '../utils';
import { useAdaptiveMatchMedia } from './useMatchMedia';

export function useAdaptive(): { layoutType: LayoutType } {
  const matchMedia = useAdaptiveMatchMedia();
  return getAdaptive(matchMedia);
}
