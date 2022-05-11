import { createContext, useContext } from 'react';

import { Value } from '../types';

const ToggleGroupValueContext = createContext<Value[]>([]);

export const ToggleGroupValueProvider = ToggleGroupValueContext.Provider;

export function useToggleGroupValue() {
  return useContext(ToggleGroupValueContext);
}
