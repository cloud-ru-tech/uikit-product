import { ReactNode } from 'react';

import { useForThemeMode } from './hooks';

export type ForThemeModeProps = {
  light: ReactNode;
  dark: ReactNode;
};

export function ForThemeMode(props: ForThemeModeProps) {
  const jsx = useForThemeMode(props);

  return <>{jsx}</>;
}
