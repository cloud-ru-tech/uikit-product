import { createContext, HTMLProps } from 'react';

export const ReferenceContext = createContext<{
  setElement(element: HTMLElement | null): void;
  getProps(props?: HTMLProps<HTMLElement>): Record<string, unknown>;
}>({
  setElement() {},
  getProps() {
    return {};
  },
});
