import { ReactElement, useState } from 'react';

import { Counter, CounterType } from '@sbercloud/uikit-product-counter';

import { TabContext } from '../../helpers/context';
import { SelectedTabRef, Sizes, TabId, TabsWrapperRef } from '../../helpers/types';

export type ContainerProps = {
  children: ReactElement[];
  size?: Sizes;
  counterType?: CounterType;
  value: TabId;
  onChange?(tab: TabId): void;
};

export function Container({
  children,
  value,
  onChange,
  size = Sizes.Medium,
  counterType = Counter.types.Count,
}: ContainerProps) {
  const [selectedTabRef, setSelectedTabRef] = useState<SelectedTabRef>(null);
  const [tabsWrapperRef, setTabsWrapperRef] = useState<TabsWrapperRef>(null);
  const [uncontrolledSelectedTab, setUncontrolledSelectedTab] = useState(value);

  const selectedTab = onChange ? value : uncontrolledSelectedTab;

  const onTabChangeHandler = (tab: TabId) => (onChange ? onChange(tab) : setUncontrolledSelectedTab(tab));

  return (
    <TabContext.Provider
      value={{
        counterType,
        selectedTab,
        setSelectedTab: onTabChangeHandler,
        tabsWrapperRef,
        setTabsWrapperRef,
        selectedTabRef,
        setSelectedTabRef,
        size,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}
