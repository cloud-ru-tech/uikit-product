import { isValidElement, ReactNode } from 'react';

function getNodeKeyPart(node: ReactNode) {
  if (isValidElement(node) && node.key != null) {
    return String(node.key);
  }

  if (typeof node === 'number') {
    return String(node);
  }

  return 'node';
}

export function getRunningLineKey(type: 'item' | 'separator' | 'copy', index: number, node?: ReactNode) {
  return `${type}-${getNodeKeyPart(node)}-${index}`;
}
