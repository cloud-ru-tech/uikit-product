import { AnchorHTMLAttributes, MouseEvent, MouseEventHandler, ReactNode } from 'react';

import { IconPredefinedProps } from '@snack-uikit/icon-predefined';

export type SidebarItem = {
  id: string | number;
  label: string;
  'data-test-id'?: string;
  onClick?(e: MouseEvent<HTMLElement>): void;
  href?: string;
  afterContent?: ReactNode;
};

export type Icon = IconPredefinedProps['icon'];

export type HeaderProps =
  | { type: 'title'; label: string; icon: Icon }
  | { type: 'back'; label: string; href?: string; onClick?: MouseEventHandler };

export type Documentation = {
  href?: string;
  onClick?: MouseEventHandler;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
};
