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
  labelText?: string;
  locked?: boolean;
  count?: number;
  mode?: Mode;
  status?: Status;
  // eslint-disable-next-line no-use-before-define
  nestedList?: SidebarItemsGroup[];
};

export type AccordionSidebarItem = BaseSidebarItem & {
  mode: Mode.Accordion;
  isDefaultOpen?: boolean;
  // eslint-disable-next-line no-use-before-define
  nestedList: SidebarItemsGroup[];
};

export type SlideSidebarItem = BaseSidebarItem & {
  href: string;
};

export type SidebarItem = AccordionSidebarItem | SlideSidebarItem;

export type SidebarOnActiveChange = (item: Partial<Pick<SidebarItem, 'id' | 'href'>>) => void;

export type SidebarItemsGroup = {
  heading?: string;
  tooltip?: {
    title?: string;
    content: string;
    button?: string;
    callToAction?: () => void;
  };
  items: SidebarItem[];
};

export type SidebarLevel = {
  list: SidebarItemsGroup[];
  title?: SidebarItem;
  children: SidebarLevel[];
  parent?: SidebarLevel;
  depth: number;
};
