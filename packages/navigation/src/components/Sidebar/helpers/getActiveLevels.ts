import { Mode, SidebarItemId, SidebarItemProps, SidebarItemsGroup, SidebarLevel } from '../types';

function findActiveItemPath(item: SidebarItemProps, selected: SidebarItemId): SidebarLevel[] | null {
  if (item.id === selected) {
    return [];
  } else if (item.nestedList) {
    for (let i = 0; i < item.nestedList.length; i++) {
      const nestedItems = item.nestedList[i].items;

      for (let j = 0; j < nestedItems.length; j++) {
        const path = findActiveItemPath(nestedItems[j], selected);

        if (path === null) {
          continue;
        }

        if (item.mode !== Mode.Accordion) {
          path.unshift({
            title: item,
            list: item.nestedList,
          });
        }

        return path;
      }
    }
  }

  return null;
}

export function getActiveLevels(list: SidebarItemsGroup[], selected?: SidebarItemId) {
  const initialLevel = { title: undefined, list };

  if (selected) {
    const items = list.flatMap(group => group.items);

    for (let i = 0; i < items.length; i += 1) {
      const nodes = findActiveItemPath(items[i], selected);

      if (nodes) {
        return [initialLevel, ...nodes];
      }
    }
  }

  return [initialLevel];
}
