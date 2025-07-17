import { MatchMediaGeneric } from '../types';

export const DISPLAY_MODES = {
  Browser: 'browser',
  Pwa: 'pwa',
  Fullscreen: 'fullscreen',
  MinimalUI: 'minimal-ui',
  WindowControlsOverlay: 'window-controls-overlay',
};

export const DISPLAY_MODE_QUERIES = {
  isBrowser: `(display-mode: browser)`,
  isPwa: `(display-mode: standalone)`,
  isFullscreen: `(display-mode: fullscreen)`,
  isMinimalUI: `(display-mode: minimal-ui)`,
  isWindowControlsOverlay: `(display-mode: window-controls-overlay)`,
};

export const INITIAL_DISPLAY_MODE_QUERIES_VALUE: MatchMediaGeneric<keyof typeof DISPLAY_MODE_QUERIES> = {
  isBrowser: false,
  isPwa: false,
  isFullscreen: false,
  isMinimalUI: false,
  isWindowControlsOverlay: false,
};
