import { createContext } from 'react';

import { Counter, CounterType } from '@sbercloud/uikit-product-counter';

import { SelectedTabRef, Sizes, TabId, TabsWrapperRef } from './types';

export const TabContext = createContext<{
  counterType: CounterType;
  selectedTab: TabId;
  setSelectedTab(tab: TabId): void;
  tabsWrapperRef: TabsWrapperRef;
  setTabsWrapperRef(ref: TabsWrapperRef): void;
  selectedTabRef: SelectedTabRef;
  setSelectedTabRef(ref: SelectedTabRef): void;
  size: Sizes;
}>({
  counterType: Counter.types.Count,
  selectedTab: '',
  setSelectedTab() {},
  tabsWrapperRef: null,
  setTabsWrapperRef() {},
  selectedTabRef: null,
  setSelectedTabRef() {},
  size: Sizes.Medium,
});
