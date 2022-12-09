import { Mode, SidebarItemProps, SidebarItemsGroup, SidebarLevel } from '../components/Sidebar/types';

export function getLevels(list: SidebarItemsGroup[], title?: SidebarItemProps): SidebarLevel[] {
  const levels: SidebarLevel[] = [{ list, title }];

  for (const group of list) {
    for (const item of group.items) {
      if (Array.isArray(item.nestedList) && item.mode !== Mode.Accordion) {
        levels.push(...getLevels(item.nestedList, item));
      }
    }
  }

  return levels;
}
