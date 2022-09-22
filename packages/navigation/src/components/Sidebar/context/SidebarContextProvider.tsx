import { MouseEvent, ReactNode, useRef, useState } from 'react';

import { getCurrentLevel, getLevels } from '../helpers';
import { shouldBeDefaultClick } from '../helpers/shouldBeDefaultClick';
import { Mode, SidebarItemId, SidebarItemProps, SidebarItemsGroup, SidebarOnActiveChange } from '../types';
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
  const [search, setSearch] = useState('');
  const [isSearchShown, setSearchShown] = useState(false);
  const levels = getLevels(list);
  const currentLevel = getCurrentLevel(levels, active);
  const previousLevelRef = useRef(currentLevel);

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

    onActiveChange({ id: prevLevelItem.title?.id, href: prevLevelItem.title?.href });
    previousLevelRef.current = currentLevel;
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
      }

      const id = (item.mode === Mode.Accordion && item.nestedList?.length ? active : item.id) as string;

      onActiveChange({ id, href: item.href });
      previousLevelRef.current = currentLevel;
    };
  }

  return (
    <SidebarContext.Provider
      value={{
        levels,
        active,
        currentLevel,
        previousLevel: previousLevelRef.current,
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
