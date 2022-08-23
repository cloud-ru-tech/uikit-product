import { MouseEvent, ReactElement } from 'react';

export type SidebarItemId = string | number;

export enum Mode {
  Slide = 'slide',
  Accordion = 'accordion',
}

export type SidebarItemProps = {
  id: SidebarItemId;
  text: string;
  href?: string;
  icon?: ReactElement;
  onClick?(e: MouseEvent, id: SidebarItemId, href?: string): void;
  disabled?: boolean;
  isNew?: boolean;
  isLocked?: boolean;
  count?: number;
  // eslint-disable-next-line no-use-before-define
  nestedList?: SidebarItemsGroup[];
  mode?: Mode;
};

export type SidebarItemsGroup = {
  heading?: string;
  items: SidebarItemProps[];
};

export type SidebarLevel = {
  title?: SidebarItemProps;
  list: SidebarItemsGroup[];
};
