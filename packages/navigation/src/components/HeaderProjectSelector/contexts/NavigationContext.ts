import { createContext } from 'react';

export const NavigationContext = createContext<{
  activeIndex: number | null;
  setActiveIndex(index: number | null): void;
}>({
  activeIndex: null,
  setActiveIndex() {},
});
