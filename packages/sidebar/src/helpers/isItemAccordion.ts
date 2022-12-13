import { AccordionSidebarItem, Mode, SidebarItem } from '../types';

export function isItemAccordion(item: SidebarItem, isMobile?: boolean): item is AccordionSidebarItem {
  return Boolean((item.mode === Mode.Accordion || isMobile) && item.nestedList?.length);
}
