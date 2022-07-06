const STORAGE_KEY = 'UIKIT_PRODUCT_UTILS_LOG_MODE_STORAGE_KEY';

export function isLogModeEnabled() {
  return STORAGE_KEY in localStorage;
}

export function enableLogMode() {
  localStorage.setItem(STORAGE_KEY, '');
}

export function disableLogMode() {
  localStorage.removeItem(STORAGE_KEY);
}

function addMessagePrefix(m: string) {
  return 'uikit-product: ' + m;
}

export function error(condition: boolean, message: string): void {
  if (!condition && isLogModeEnabled()) {
    console.error(addMessagePrefix(message));
  }
}

export function warning(condition: boolean, message: string): void {
  if (!condition && isLogModeEnabled()) {
    console.warn(addMessagePrefix(message));
  }
}
