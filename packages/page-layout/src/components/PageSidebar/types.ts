import { AnchorHTMLAttributes, MouseEvent, MouseEventHandler, ReactNode } from 'react';

import { IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { TooltipProps } from '@snack-uikit/tooltip';

export type SidebarItem = {
  id: string | number;
  label: string;
  'data-test-id'?: string;
  onClick?(e: MouseEvent<HTMLElement>): void;
  href?: string;
  afterContent?: ReactNode;
  disabledReason?: ReactNode;
  disabledReasonPlacement?: TooltipProps['placement'];
  items?: SidebarItem[];
  beforeContent?: ReactNode;
};

export type Icon = IconPredefinedProps['icon'];

export type HeaderProps =
  | { type: 'title'; label: string; icon: Icon; afterContent?: ReactNode }
  | { type: 'back'; label: string; href?: string; onClick?: MouseEventHandler };

export type Documentation = {
  href?: string;
  onClick?: MouseEventHandler;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
};
