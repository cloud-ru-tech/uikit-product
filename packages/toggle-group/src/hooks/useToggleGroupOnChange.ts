import { createContext, useContext } from 'react';

import { Value } from '../types';

const ToggleGroupOnChangeContext = createContext<(value: Value[]) => void>(() => {});

export const ToggleGroupOnChangeProvider = ToggleGroupOnChangeContext.Provider;

export function useToggleGroupOnChange() {
  return useContext(ToggleGroupOnChangeContext);
}
