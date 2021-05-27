import { createContext } from 'react';

import { TAction } from './reducer';
import { TState } from './types';

export interface ITabsContext {
  state: TState;
  dispatch: (event: TAction) => void;
}

export const TabsContext = createContext<ITabsContext | null>(null);
