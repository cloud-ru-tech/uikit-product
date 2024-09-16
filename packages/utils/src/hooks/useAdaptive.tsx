import { LayoutType } from '../types/adaptive';
import { getAdaptive } from '../utils';
import { useMatchMedia } from './useMatchMedia';

export function useAdaptive(): { layoutType: LayoutType } {
  const matchMedia = useMatchMedia();
  return getAdaptive(matchMedia);
}
