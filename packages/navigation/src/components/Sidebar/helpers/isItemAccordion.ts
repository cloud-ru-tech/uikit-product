import { Mode, SidebarItemProps } from '../types';

export function isItemAccordion(item: SidebarItemProps) {
  return Boolean(item.mode === Mode.Accordion && item.nestedList?.length);
}
