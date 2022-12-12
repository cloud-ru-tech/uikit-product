import { ReactElement } from 'react';

export type SidebarItemId = string | number;

export enum Mode {
  Slide = 'slide',
  Accordion = 'accordion',
}

export enum Status {
  Active = 'active',
  Suspended = 'suspended',
}

type BaseSidebarItem = {
  id: SidebarItemId;
  label: string;
  href?: string;
  icon?: ReactElement;
  disabled?: boolean;
  showNewLabel?: boolean;
  locked?: boolean;
  count?: number;
  mode?: Mode;
  status?: Status;
  // eslint-disable-next-line no-use-before-define
  nestedList?: SidebarItemsGroup[];
};

type AccordionSidebarItem = BaseSidebarItem & {
  mode: Mode.Accordion;
  // eslint-disable-next-line no-use-before-define
  nestedList: SidebarItemsGroup[];
};

type SidebarItemSlide = BaseSidebarItem & {
  href: string;
};

export type SidebarItemProps = AccordionSidebarItem | SidebarItemSlide;

export type SidebarOnActiveChange = (item: Partial<Pick<SidebarItemProps, 'id' | 'href'>>) => void;

export type SidebarItemsGroup = {
  heading?: string;
  items: SidebarItemProps[];
};

export type SidebarLevel = {
  list: SidebarItemsGroup[];
  title?: SidebarItemProps;
  children: SidebarLevel[];
  parent?: SidebarLevel;
  depth: number;
};
