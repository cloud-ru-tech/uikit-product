import { createContext, ReactNode, useContext, useState } from 'react';

type StackedToastsContextType = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

export const StackedToastsContext = createContext<StackedToastsContextType>({
  collapsed: true,
  setCollapsed: () => {},
});

type StackedToastsProviderProps = {
  children: ReactNode;
};

export const useStackedToastsContext = () => useContext(StackedToastsContext);

export function StackedToastsProvider({ children }: StackedToastsProviderProps) {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <StackedToastsContext.Provider
      value={{
        collapsed,
        setCollapsed,
      }}
    >
      {children}
    </StackedToastsContext.Provider>
  );
}
