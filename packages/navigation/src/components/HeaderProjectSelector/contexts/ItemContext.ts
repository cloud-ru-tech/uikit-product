import { createContext, HTMLProps } from 'react';

export const ItemContext = createContext<{
  setElement(element: HTMLElement | null, index: number | null): void;
  getProps(props?: HTMLProps<HTMLElement>): Record<string, unknown>;
}>({
  setElement() {},
  getProps() {
    return {};
  },
});
