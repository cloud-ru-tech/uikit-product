import { Mode, SidebarItemId, SidebarItemsGroup, SidebarLevel } from '../components/Sidebar/types';

const DEFAULT_LEVEL = 0;

function hasActiveItem(active: SidebarItemId, list: SidebarItemsGroup[]): boolean {
  for (const group of list) {
    for (const item of group.items) {
      if (Array.isArray(item.nestedList)) {
        if (item.mode === Mode.Accordion && hasActiveItem(active, item.nestedList)) {
          return true;
        }

        continue;
      }

      if (item.id === active) {
        return true;
      }
    }
  }

  return false;
}

export function getCurrentLevel(levels: SidebarLevel[], active?: SidebarItemId) {
  return active
    ? Math.max(
        levels.findIndex(level => level.title?.id === active || hasActiveItem(active, level.list)),
        DEFAULT_LEVEL,
      )
    : DEFAULT_LEVEL;
}
