import { Mode, SidebarItemProps } from '../components/Sidebar/types';

export function isItemAccordion(item: SidebarItemProps, isMobile?: boolean) {
  return Boolean((item.mode === Mode.Accordion || isMobile) && item.nestedList?.length);
}
