import { JSXElementConstructor, MouseEvent, ReactElement } from 'react';

import { CardServiceSmallProps, CardSuggestProps } from '@sbercloud/uikit-product-card-predefined';
import { HotSpotProps } from '@snack-uikit/hot-spot';
import { BaseItemProps } from '@snack-uikit/list';

export type { NotificationsProps, FinancialMenuProps } from './helperComponents';

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
  id: string;
  icon: JSXElementConstructor<{
    size?: number;
    className?: string;
  }>;
  label: string;
  onClick(e?: MouseEvent<HTMLElement>): void;
  href?: string;
  disabled?: boolean;
  hidden?: boolean;
  badge?: CardServiceSmallProps['promoBadge'];
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
  hotSpot?: HotSpotProps;
};

export type PinnedCard = {
  id: string;
  title: string;
  description: string;
  onClick(): void;
  href?: string;
  disabled?: boolean;
  hidden?: boolean;
  badge?: CardSuggestProps['promoBadge'];
};

export const DIVIDER_SETTING_OPTION_ID = 'divider';

export type DividerItem = {
  id: typeof DIVIDER_SETTING_OPTION_ID;
  hidden?: boolean;
};

export type FooterLink = {
  id: string;
  icon: ReactElement;
  label: string;
  onClick(e?: MouseEvent<HTMLElement>): void;
  href?: string;
  disabled?: boolean;
  hidden?: boolean;
  hotSpot?: HotSpotProps;
};

export type Platform = {
  id: string;
  name: string;
  logo: ReactElement;
  hidden?: boolean;
};

export type Workspace = {
  id: string;
  name: string;
};

type ValueOf<T> = T[keyof T];

export const THEME_MODE = {
  Light: 'light',
  Dark: 'dark',
  System: 'system',
} as const;

export type ThemeMode = ValueOf<typeof THEME_MODE>;
