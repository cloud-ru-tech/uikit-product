import { MatchMediaGeneric } from '../types';

export const DISPLAY_MODES = {
  Browser: 'browser',
  Standalone: 'standalone',
  Fullscreen: 'fullscreen',
  MinimalUI: 'minimal-ui',
  WindowControlsOverlay: 'window-controls-overlay',
};

export const DISPLAY_MODE_QUERIES = {
  isBrowser: `(display-mode: ${DISPLAY_MODES.Browser})`,
  isStandalone: `(display-mode: ${DISPLAY_MODES.Standalone})`,
  isFullscreen: `(display-mode: ${DISPLAY_MODES.Fullscreen})`,
  isMinimalUI: `(display-mode: ${DISPLAY_MODES.MinimalUI})`,
  isWindowControlsOverlay: `(display-mode: ${DISPLAY_MODES.WindowControlsOverlay})`,
};

export const INITIAL_DISPLAY_MODE_QUERIES_VALUE: MatchMediaGeneric<keyof typeof DISPLAY_MODE_QUERIES> = {
  isBrowser: false,
  isStandalone: false,
  isFullscreen: false,
  isMinimalUI: false,
  isWindowControlsOverlay: false,
};
