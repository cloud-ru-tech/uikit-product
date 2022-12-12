import { MouseEvent, ReactNode, useRef, useState } from 'react';

import {
  Mode,
  SidebarItemId,
  SidebarItemProps,
  SidebarLevel,
  SidebarOnActiveChange,
} from '../components/Sidebar/types';
import { getCurrentLevel, isItemAccordion, shouldBeDefaultClick } from '../helpers';
import { SidebarContext } from './SidebarContext';

type SidebarContextProviderProps = {
  levels: SidebarLevel;
  active?: SidebarItemId;
  onActiveChange: SidebarOnActiveChange;
  children: ReactNode;
  isCollapsed: boolean;
  setIsCollapsed(value: boolean): void;
};

export function SidebarContextProvider({
  levels,
  active,
  onActiveChange,
  children,
  isCollapsed,
  setIsCollapsed,
}: SidebarContextProviderProps) {
  const [search, setSearch] = useState('');
  const [isSearchShown, setSearchShown] = useState(false);
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

    const prevLevelItem = currentLevel.parent;

    onActiveChange({ id: prevLevelItem?.title?.id, href: prevLevelItem?.title?.href });
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

      const id = (isItemAccordion(item) ? active : item.id) as string;

      onActiveChange({ id, href: item.href });
      previousLevelRef.current = currentLevel;
    };
  }

  return (
    <SidebarContext.Provider
      value={{
        active,
        currentLevel,
        previousLevel: previousLevelRef.current,
        search,
        isSearchDirty: Boolean(search.length),
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
