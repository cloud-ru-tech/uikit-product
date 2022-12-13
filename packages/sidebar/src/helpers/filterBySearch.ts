import { SidebarItem, SidebarItemsGroup } from '../types';
import { isItemAccordion } from './isItemAccordion';

export function filterBySearch(list: SidebarItemsGroup[], search: string) {
  const flatList = list.flatMap(l => l.items);
  const stack = [...flatList];
  const searchString = search.toLowerCase();
  const result: SidebarItem[] = [];
  let currentItem: SidebarItem | undefined;

  while ((currentItem = stack.shift())) {
    if (currentItem.label.toLowerCase().includes(searchString)) {
      result.push(currentItem);
    }

    if (isItemAccordion(currentItem)) {
      stack.push(...currentItem.nestedList.flatMap(l => l.items));
    }
  }

  return result;
}
