import { createContext } from 'react';

export const SelectionContext = createContext<{
  selectedValue: string | null;
  selectedIndex: number | null;
  setSelectedValue(value: string): void;
}>({
  selectedValue: null,
  selectedIndex: null,
  setSelectedValue() {},
});
