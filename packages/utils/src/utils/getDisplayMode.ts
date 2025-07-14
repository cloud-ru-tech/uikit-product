import { isBrowser } from '@snack-uikit/utils';

import { DISPLAY_MODE_QUERIES, DISPLAY_MODES } from '../constants/displayMode';
import { MatchMediaGeneric } from '../types';

export function getDisplayMode(matchMedia: MatchMediaGeneric<keyof typeof DISPLAY_MODE_QUERIES>) {
  if (isBrowser()) {
    if (document.referrer.startsWith('android-app://')) {
      return 'twa';
    }

    if (matchMedia.isBrowser) {
      return DISPLAY_MODES.Browser;
    }

    if (matchMedia.isStandalone) {
      return DISPLAY_MODES.Standalone;
    }

    if (matchMedia.isFullscreen) {
      return DISPLAY_MODES.Fullscreen;
    }

    if (matchMedia.isMinimalUI) {
      return DISPLAY_MODES.MinimalUI;
    }

    if (matchMedia.isWindowControlsOverlay) {
      return DISPLAY_MODES.WindowControlsOverlay;
    }
  }

  return 'unknown';
}
