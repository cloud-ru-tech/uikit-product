import { createContext, MouseEvent, useContext } from 'react';

import { SidebarItemId, SidebarItemProps, SidebarLevel } from '../types';

type SidebarContextProps = {
  levels: SidebarLevel[];
  active?: SidebarItemId;
  currentLevel: number;
  search: string;
  setSearch(value: string): void;
  isSearchShown: boolean;
  openSearch(): void;
  isCollapsed: boolean;
  collapse(): void;
  uncollapse(): void;
  closeSearch(): void;
  handleBackClick(): void;
  handleItemClick(item: SidebarItemProps): (e: MouseEvent) => void;
};

export const SIDEBAR_CONTEXT_STUB: SidebarContextProps = {
  currentLevel: 0,
  levels: [],
  search: '',
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
