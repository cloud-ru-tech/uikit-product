import { createContext } from 'react';

import { CounterTypes, SelectedTabRef, Sizes, TabId, TabsWrapperRef } from './types';

export const TabContext = createContext<{
  counterType: CounterTypes;
  selectedTab: TabId;
  setSelectedTab(tab: TabId): void;
  tabsWrapperRef: TabsWrapperRef;
  setTabsWrapperRef(ref: TabsWrapperRef): void;
  selectedTabRef: SelectedTabRef;
  setSelectedTabRef(ref: SelectedTabRef): void;
  size: Sizes;
}>({
  counterType: CounterTypes.Count,
  selectedTab: '',
  setSelectedTab() {},
  tabsWrapperRef: null,
  setTabsWrapperRef() {},
  selectedTabRef: null,
  setSelectedTabRef() {},
  size: Sizes.Medium,
});
