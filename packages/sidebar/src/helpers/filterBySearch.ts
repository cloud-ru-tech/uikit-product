import { Mode, SidebarItemProps, SidebarItemsGroup } from '../components/Sidebar/types';

export function filterBySearch(list: SidebarItemsGroup[], search: string) {
  const flatList = list.flatMap(l => l.items);
  const result: SidebarItemProps[] = [];

  const stack = [...flatList];
  let currentItem: SidebarItemProps;

  const searchString = search.toLowerCase();

  while (stack.length > 0) {
    currentItem = stack.shift() as SidebarItemProps;

    if (currentItem.label.toLowerCase().includes(searchString)) {
      result.push(currentItem);
    }

    if (currentItem.nestedList?.length) {
      for (let ii = 0; ii < currentItem.nestedList.length; ii += 1) {
        if (currentItem.mode !== Mode.Accordion) {
          continue;
        }

        stack.push(...currentItem.nestedList[ii].items);
      }
    }
  }

  return result;
}
