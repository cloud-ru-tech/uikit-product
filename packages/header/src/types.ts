import { JSXElementConstructor, ReactElement } from 'react';

export type { NotificationsProps } from './helperComponents';

export type User = {
  name: string;
  email: string;
};

export type Organization = {
  id: string;
  name: string;
};

export type Project = {
  id: string;
  name: string;
  onEdit?(): void;
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
};

export type LinksGroup = {
  id: string;
  label: string;
  items: InnerLink[];
};

export type ProductOption = {
  id: string;
  name: string;
  category: string;
  logo?: ReactElement;
  href?: string;
};

export type PinnedCard = {
  title: string;
  description: string;
  onClick(): void;
  href?: string;
  disabled?: boolean;
};

export type FooterLink = {
  icon: ReactElement;
  label: string;
  onClick(): void;
  href?: string;
  disabled?: boolean;
};

export type Platform = {
  id: string;
  name: string;
  logo: ReactElement;
};
