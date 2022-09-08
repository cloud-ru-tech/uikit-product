import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';

import { TRANSITION_TIMING } from '../constants';
import { getActiveLevels } from '../helpers';
import { shouldBeDefaultClick } from '../helpers/shouldBeDefaultClick';
import {
  Mode,
  SidebarItemId,
  SidebarItemProps,
  SidebarItemsGroup,
  SidebarLevel,
  SidebarOnActiveChange,
} from '../types';
import { SidebarContext } from './SidebarContext';

type SidebarContextProviderProps = {
  list: SidebarItemsGroup[];
  active?: SidebarItemId;
  onActiveChange: SidebarOnActiveChange;
  children: ReactNode;
  isCollapsed: boolean;
  setIsCollapsed(value: boolean): void;
};

export function SidebarContextProvider({
  list,
  active,
  onActiveChange,
  children,
  isCollapsed,
  setIsCollapsed,
}: SidebarContextProviderProps) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [levels, setLevels] = useState<SidebarLevel[]>([]);
  const manualLevelChange = useRef<boolean>();

  const [search, setSearch] = useState('');
  const [isSearchShown, setSearchShown] = useState(false);

  useEffect(() => {
    if (manualLevelChange.current) {
      manualLevelChange.current = false;
      return;
    }

    const activeLevels = getActiveLevels(list, active);

    setLevels(activeLevels);
    setCurrentLevel(activeLevels.length - 1);
  }, [list, active]);

  function closeSearch() {
    setSearchShown(false);
    setSearch('');
  }

  function openSearch() {
    setSearchShown(true);
  }

  function collapse() {
    setIsCollapsed(true);
  }

  function uncollapse() {
    setIsCollapsed(false);
  }

  function handleBackClick() {
    closeSearch();

    const prevLevel = currentLevel - 1;
    const prevLevelItem = levels[prevLevel];

    if (currentLevel > 0) {
      setCurrentLevel(prevLevel);

      setTimeout(() => {
        setLevels(prev => prev.slice(0, -1));
      }, TRANSITION_TIMING.hideLevel + 10); // awaiting transition to end before remove level
    }

    onActiveChange({ id: prevLevelItem.title?.id, href: prevLevelItem.title?.href });

    manualLevelChange.current = true;
  }

  function goToNextLevel(item: SidebarItemProps) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newLevels = [...levels, { title: item, list: item.nestedList! }];
    setLevels(newLevels);

    // possible bottleneck after migration to React 18
    setTimeout(() => {
      setCurrentLevel(newLevels.length - 1);
    }, 0);
  }

  function handleItemClick(item: SidebarItemProps) {
    return (event: MouseEvent) => {
      if (shouldBeDefaultClick(event)) {
        return;
      }

      event.preventDefault();

      if (item.disabled) {
        return;
      }

      if (item.mode !== Mode.Accordion) {
        closeSearch();

        if (item.nestedList) {
          manualLevelChange.current = true;
          goToNextLevel(item);
        }
      }

      const id = (item.mode === Mode.Accordion && item.nestedList?.length ? active : item.id) as string;

      return onActiveChange({ id, href: item.href });
    };
  }

  return (
    <SidebarContext.Provider
      value={{
        levels,
        active,
        currentLevel,
        search,
        setSearch,
        isSearchShown,
        openSearch,
        closeSearch,
        handleBackClick,
        handleItemClick,
        isCollapsed,
        collapse,
        uncollapse,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
