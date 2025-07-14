import { ValueOf } from '@snack-uikit/utils';

import { DISPLAY_MODES } from '../constants/displayMode';
import { getDisplayMode } from '../utils/getDisplayMode';
import { useDisplayModeMatchMedia } from './useMatchMedia';

export function useDisplayMode(): 'unknown' | 'twa' | ValueOf<typeof DISPLAY_MODES> {
  const matchMedia = useDisplayModeMatchMedia();
  return getDisplayMode(matchMedia);
}
