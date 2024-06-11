import { ReactNode } from 'react';

export function isStringOrNumber(content: ReactNode): content is string | number {
  return ['string', 'number'].includes(typeof content);
}
