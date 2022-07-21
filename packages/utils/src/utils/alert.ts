import { isDebugModeEnabled } from '@sbercloud/ft-debug-mode';

function addMessagePrefix(m: string) {
  return 'uikit-product: ' + m;
}

export function error(condition: boolean, message: string): void {
  if (!condition && isDebugModeEnabled()) {
    console.error(addMessagePrefix(message));
  }
}

export function warning(condition: boolean, message: string): void {
  if (!condition && isDebugModeEnabled()) {
    console.warn(addMessagePrefix(message));
  }
}
