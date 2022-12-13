import { createContext, MouseEvent, useContext } from 'react';

import { SidebarItem, SidebarItemId, SidebarLevel } from '../types';

type SidebarContextProps = {
  currentLevel?: SidebarLevel;
  previousLevel?: SidebarLevel;
  active?: SidebarItemId;
  search: string;
  isSearchDirty: boolean;
  setSearch(value: string): void;
  isSearchShown: boolean;
  openSearch(): void;
  isCollapsed: boolean;
  collapse(): void;
  uncollapse(): void;
  closeSearch(): void;
  handleBackClick(): void;
  handleItemClick(item: SidebarItem): (e: MouseEvent) => void;
};

export const SIDEBAR_CONTEXT_STUB: SidebarContextProps = {
  search: '',
  isSearchDirty: false,
  setSearch() {},
  isSearchShown: false,
  openSearch() {},
  isCollapsed: false,
  collapse() {},
  uncollapse() {},
  closeSearch() {},
  handleBackClick() {},
  handleItemClick() {
    return () => {};
  },
};

export const SidebarContext = createContext<SidebarContextProps>(SIDEBAR_CONTEXT_STUB);

export const useSidebarContext = () => useContext(SidebarContext);
