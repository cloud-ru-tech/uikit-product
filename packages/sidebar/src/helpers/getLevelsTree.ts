import { Mode, SidebarItem, SidebarItemsGroup, SidebarLevel } from '../types';

function getLevelsTreeInner({
  list,
  title,
  parent,
  depth = 0,
}: {
  list: SidebarItemsGroup[];
  title?: SidebarItem;
  parent?: SidebarLevel;
  depth?: number;
}): SidebarLevel {
  const node: SidebarLevel = { list, title, parent, children: [], depth };

  for (const group of list) {
    for (const item of group.items) {
      if (Array.isArray(item.nestedList) && item.mode !== Mode.Accordion) {
        node.children.push(
          getLevelsTreeInner({
            list: item.nestedList,
            title: item,
            parent: node,
            depth: depth + 1,
          }),
        );
      }
    }
  }

  return node;
}

export function getLevelsTree(list: SidebarItemsGroup[]): SidebarLevel {
  return getLevelsTreeInner({ list });
}
