import { ReactNode, useMemo } from 'react';

import { SiteFormContext, SiteFormContextType } from '../context';

type SiteFormProviderProps = SiteFormContextType & {
  children: ReactNode;
};

export function SiteFormProvider({
  layoutType,
  onControlClick,
  getCompanySuggestions,
  children,
}: SiteFormProviderProps) {
  const value = useMemo(
    () => ({ layoutType, onControlClick, getCompanySuggestions }),
    [layoutType, onControlClick, getCompanySuggestions],
  );

  return <SiteFormContext.Provider value={value}>{children}</SiteFormContext.Provider>;
}
