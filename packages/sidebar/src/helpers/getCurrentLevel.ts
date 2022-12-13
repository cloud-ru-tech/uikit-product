import { Mode, SidebarItemId, SidebarItemsGroup, SidebarLevel } from '../types';

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

function getCurrentLevelInner(root: SidebarLevel, active: SidebarItemId): SidebarLevel | undefined {
  if (root.title?.id === active || hasActiveItem(active, root.list)) {
    return root;
  }

  for (const child of root.children) {
    const level = getCurrentLevelInner(child, active);

    if (level) {
      return level;
    }
  }

  return undefined;
}

export function getCurrentLevel(root: SidebarLevel, active?: SidebarItemId): SidebarLevel {
  if (!active) return root;

  return getCurrentLevelInner(root, active) ?? root;
}
