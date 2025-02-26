import { MouseEvent, ReactNode } from 'react';

export type SidebarItem = {
  id: string | number;
  label: string;
  'data-test-id'?: string;
  onClick?(e: MouseEvent<HTMLElement>): void;
  href?: string;
  afterContent?: ReactNode;
  disabledReason?: ReactNode;
  items?: SidebarItem[];
};
