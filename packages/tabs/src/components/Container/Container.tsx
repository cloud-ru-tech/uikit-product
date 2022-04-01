import { ReactElement, useEffect, useState } from 'react';

import { TabContext } from '../../helpers/context';
import { CounterTypes, SelectedTabRef, Sizes, TabId } from '../../helpers/types';

export type ContainerProps = {
  children: ReactElement[];
  size?: Sizes;
  counterType?: CounterTypes;
  value: TabId;
  onChange?(tab: TabId): void;
};

export function Container({
  children,
  value,
  onChange,
  size = Sizes.Medium,
  counterType = CounterTypes.Count,
}: ContainerProps) {
  const [selectedTabRef, setSelectedTabRef] = useState<SelectedTabRef>(null);
  const [controlledSelectedTab, setControlledSelectedTab] = useState(value);
  const [uncontrolledSelectedTab, setUncontrolledSelectedTab] = useState(value);

  useEffect(() => {
    if (value !== controlledSelectedTab) {
      setUncontrolledSelectedTab(value);
      setControlledSelectedTab(value);
    }
  }, [controlledSelectedTab, value]);

  const onTabChangeHandler = (tab: TabId) => {
    setUncontrolledSelectedTab(tab);
    onChange?.(tab);
  };

  return (
    <TabContext.Provider
      value={{
        counterType,
        selectedTab: uncontrolledSelectedTab,
        setSelectedTab: onTabChangeHandler,
        selectedTabRef,
        setSelectedTabRef,
        size,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}
