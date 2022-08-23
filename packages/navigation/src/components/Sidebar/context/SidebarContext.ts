import { createContext, MouseEvent, useContext } from 'react';

import { SidebarItemId, SidebarItemProps, SidebarLevel } from '../types';

type SidebarContextProps = {
  levels: SidebarLevel[];
  selected?: SidebarItemId;
  currentLevel: number;
  search: string;
  setSearch(value: string): void;
  isSearchShown: boolean;
  openSearch(): void;
  closeSearch(): void;
  handleBackClick(): void;
  handleItemClick(item: SidebarItemProps): (e: MouseEvent) => void;
};

export const SidebarContext = createContext<SidebarContextProps>({
  currentLevel: 0,
  levels: [],
  search: '',
  setSearch() {},
  isSearchShown: false,
  openSearch() {},
  closeSearch() {},
  handleBackClick() {},
  handleItemClick() {
    return () => {};
  },
});

export const useSidebarContext = () => useContext(SidebarContext);
