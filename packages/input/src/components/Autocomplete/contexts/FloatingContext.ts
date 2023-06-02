import { createContext } from 'react';

export const FloatingContext = createContext<{
  isOpen: boolean;
  setIsOpen(isOpen: boolean): void;
}>({
  isOpen: false,
  setIsOpen() {},
});
