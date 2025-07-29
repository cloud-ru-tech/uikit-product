import { AnchorHTMLAttributes, MouseEvent, MouseEventHandler, ReactNode } from 'react';

import { IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { TooltipProps } from '@snack-uikit/tooltip';

export type SidebarItemBase = {
  id: string | number;
  label: string;
  'data-test-id'?: string;
  onClick?(e: MouseEvent<HTMLElement>): void;
  afterContent?: ReactNode;
  disabledReason?: ReactNode;
  disabledReasonPlacement?: TooltipProps['placement'];
  beforeContent?: ReactNode;
};

export type SidebarItemWithHref = SidebarItemBase & {
  href: string;
};

export type SidebarItemWithItems = SidebarItemBase & {
  // eslint-disable-next-line no-use-before-define
  items: SidebarItem[];
};

export type SidebarItem = SidebarItemWithHref | SidebarItemWithItems;

export type Icon = IconPredefinedProps['icon'];

export type HeaderProps =
  | { type: 'title'; label: string; icon: Icon; afterContent?: ReactNode }
  | { type: 'back'; label: string; href?: string; onClick?: MouseEventHandler };

export type Documentation = {
  href?: string;
  onClick?: MouseEventHandler;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
};
