import { Mode, SidebarItemId, SidebarItemProps } from '../types';

export function findSelected(
  element: SidebarItemProps,
  selected?: SidebarItemId,
  maxNestedLevel?: number,
): SidebarItemProps | null {
  const stack = [];
  let node: SidebarItemProps | undefined;
  let ii;
  let level = 0;

  stack.push(element);

  while (stack.length > 0) {
    node = stack.pop() as SidebarItemProps;

    if (node.id === selected) {
      return node;
    } else if (node?.nestedList?.length) {
      level += 1;

      for (ii = 0; ii < node.nestedList.length; ii += 1) {
        if (maxNestedLevel && node.mode !== Mode.Accordion && level > maxNestedLevel) {
          continue;
        }

        stack.push(...node.nestedList[ii].items);
      }
    }
  }

  return null;
}
