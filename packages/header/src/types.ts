import { JSXElementConstructor, ReactElement } from 'react';

import { CardProps } from '@snack-uikit/card';
import { BaseItemProps } from '@snack-uikit/list';

export type { NotificationsProps } from './helperComponents';

export type User = {
  name: string;
  email: string;
};

export type Organization = {
  id: string;
  name: string;
  new?: boolean;
};

export type Project = {
  id: string;
  name: string;
  onEdit?(): void;
  actions?: BaseItemProps[];
};

export type InnerLink = {
  icon: JSXElementConstructor<{
    size?: number;
    className?: string;
  }>;
  label: string;
  onClick(): void;
  href?: string;
  disabled?: boolean;
  hidden?: boolean;
  badge?: CardProps['promoBadge'];
};

export type LinksGroup = {
  id: string;
  label: string;
  hidden?: boolean;
  items: InnerLink[];
};

export type ProductOption = {
  id: string;
  name: string;
  category: string;
  logo?: ReactElement;
  href?: string;
  hidden?: boolean;
};

export type PinnedCard = {
  title: string;
  description: string;
  onClick(): void;
  href?: string;
  disabled?: boolean;
  hidden?: boolean;
  badge?: CardProps['promoBadge'];
};

export type FooterLink = {
  icon: ReactElement;
  label: string;
  onClick(): void;
  href?: string;
  disabled?: boolean;
  hidden?: boolean;
};

export type Platform = {
  id: string;
  name: string;
  logo: ReactElement;
};

export type Workspace = {
  id: string;
  name: string;
};
