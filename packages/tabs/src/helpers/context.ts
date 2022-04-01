import { createContext } from 'react';

import { CounterTypes, SelectedTabRef, Sizes, TabId } from './types';

export const TabContext = createContext<{
  counterType: CounterTypes;
  selectedTab: TabId;
  setSelectedTab(tab: TabId): void;
  selectedTabRef: SelectedTabRef;
  setSelectedTabRef(ref: SelectedTabRef): void;
  size: Sizes;
}>({
  counterType: CounterTypes.Count,
  selectedTab: '',
  setSelectedTab() {},
  selectedTabRef: null,
  setSelectedTabRef() {},
  size: Sizes.Medium,
});
