import { createContext } from 'react';

import { TState } from './types';
import { TAction } from './reducer';

export interface ITabsContext {
  state: TState;
  dispatch: (event: TAction) => void;
}

export const TabsContext = createContext<ITabsContext | null>(null);
