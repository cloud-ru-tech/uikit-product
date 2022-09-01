import { createContext, MutableRefObject } from 'react';

export const FloatingContext = createContext<{
  isOpen: boolean;
  setIsOpen(isOpen: boolean): void;
  initialFocusRef: MutableRefObject<HTMLElement | null>;
}>({
  isOpen: false,
  setIsOpen() {},
  initialFocusRef: { current: null },
});
