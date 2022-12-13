import { SidebarItem, SidebarItemId } from '../types';

export function findActive(element: SidebarItem, active?: SidebarItemId): SidebarItem | null {
  const stack = [];
  let node: SidebarItem | undefined;
  stack.push(element);

  while ((node = stack.pop())) {
    if (node.id === active) {
      return node;
    }

    if (node.nestedList?.length) {
      stack.push(...node.nestedList.flatMap(l => l.items));
    }
  }

  return null;
}
