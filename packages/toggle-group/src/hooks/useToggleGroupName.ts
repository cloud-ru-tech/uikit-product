import { createContext, useContext } from 'react';

const ToggleGroupNameContext = createContext<string>('');

export const ToggleGroupNameProvider = ToggleGroupNameContext.Provider;

export function useToggleGroupName() {
  return useContext(ToggleGroupNameContext);
}
