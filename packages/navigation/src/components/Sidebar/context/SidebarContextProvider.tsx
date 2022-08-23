import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';

import { TRANSITION_TIMING } from '../constants';
import { getActiveLevels } from '../helpers';
import { Mode, SidebarItemId, SidebarItemProps, SidebarItemsGroup, SidebarLevel } from '../types';
import { SidebarContext } from './SidebarContext';

type SidebarContextProviderProps = {
  list: SidebarItemsGroup[];
  selected?: SidebarItemId;
  onItemClick: SidebarItemProps['onClick'];
  onBackClick?(): void;
  children: ReactNode;
};

export function SidebarContextProvider({
  list,
  selected,
  onItemClick,
  onBackClick,
  children,
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

    const activeLevels = getActiveLevels(list, selected);

    setLevels(activeLevels);
    setCurrentLevel(activeLevels.length - 1);
  }, [list, selected]);

  function closeSearch() {
    setSearchShown(false);
    setSearch('');
  }

  function openSearch() {
    setSearchShown(true);
  }

  function handleBackClick() {
    closeSearch();

    if (currentLevel > 0) {
      setCurrentLevel(level => level - 1);

      setTimeout(() => {
        setLevels(prev => prev.slice(0, -1));
      }, TRANSITION_TIMING.hideLevel + 10); // awaiting transition to end before remove level
    }

    onBackClick?.();

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
    return (e: MouseEvent) => {
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

      const id = (item.mode === Mode.Accordion ? selected : item.id) as string;

      if (item.onClick) {
        return item.onClick?.(e, id, item.href);
      }

      return onItemClick?.(e, id, item.href);
    };
  }

  return (
    <SidebarContext.Provider
      value={{
        levels,
        selected,
        currentLevel,
        search,
        setSearch,
        isSearchShown,
        openSearch,
        closeSearch,
        handleBackClick,
        handleItemClick,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
