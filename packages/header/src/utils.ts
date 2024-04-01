import { MouseEvent } from 'react';

export function stopPropagationClick(e: MouseEvent) {
  e.stopPropagation();
}

export function extractAppNameFromId(id: string) {
  const [fallback, appName] = id.split('/');

  return appName || fallback;
}
