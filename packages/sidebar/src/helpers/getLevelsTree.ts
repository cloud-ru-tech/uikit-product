import { Mode, SidebarItemProps, SidebarItemsGroup, SidebarLevel } from '../components/Sidebar/types';

function getLevelsTreeInner(
  list: SidebarItemsGroup[],
  depth = 0,
  title?: SidebarItemProps,
  parent?: SidebarLevel,
): SidebarLevel {
  const node: SidebarLevel = { list, title, parent, children: [], depth };

  for (const group of list) {
    for (const item of group.items) {
      if (Array.isArray(item.nestedList) && item.mode !== Mode.Accordion) {
        node.children.push(getLevelsTreeInner(item.nestedList, depth + 1, item, node));
      }
    }
  }

  return node;
}

export function getLevelsTree(list: SidebarItemsGroup[]): SidebarLevel {
  return getLevelsTreeInner(list);
}
