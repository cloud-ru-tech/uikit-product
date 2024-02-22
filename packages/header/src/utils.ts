import { MouseEvent } from 'react';

export function stopPropagationClick(e: MouseEvent) {
  e.stopPropagation();
}
