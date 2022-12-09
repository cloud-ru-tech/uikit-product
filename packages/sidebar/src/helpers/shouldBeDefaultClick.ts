import { MouseEvent } from 'react';

export function shouldBeDefaultClick(event: MouseEvent) {
  return (
    !event.defaultPrevented && event.button === 0 && (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
}
