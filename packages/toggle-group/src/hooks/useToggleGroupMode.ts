import { createContext, useContext } from 'react';

import { Mode } from '../constants';

const ToggleGroupModeContext = createContext<Mode | null>(null);

export const ToggleGroupModeProvider = ToggleGroupModeContext.Provider;

export function useToggleGroupMode() {
  return useContext(ToggleGroupModeContext);
}
