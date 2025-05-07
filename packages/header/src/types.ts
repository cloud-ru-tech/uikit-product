import { JSXElementConstructor, MouseEvent, MouseEventHandler, ReactElement } from 'react';

import { CardServiceSmallProps } from '@sbercloud/uikit-product-card-predefined';
import { HotSpotProps } from '@snack-uikit/hot-spot';
import { BaseItemProps } from '@snack-uikit/list';

export type { NotificationsProps, DrawerMenuProps } from './helperComponents';

export type User = {
  name: string;
  email: string;
};

export type Organization = {
  id: string;
  name: string;
  new?: boolean;
  type: string;
  partner?: boolean;
  actions?: BaseItemProps[];
};

export type Project = {
  id: string;
  name: string;
  createdAt: string;
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

type TitleStatic = {
  text: string;
  onClick?: never;
};

type TitleClickable = {
  text: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export type LinksGroupTitle = TitleStatic | TitleClickable;

export type LinksGroup = {
  id: string;
  label: LinksGroupTitle;
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

type ValueOf<T> = T[keyof T];

export const THEME_MODE = {
  Light: 'light',
  Dark: 'dark',
  System: 'system',
} as const;

export type ThemeMode = ValueOf<typeof THEME_MODE>;

export const HEADER_LOGO_MODE = {
  develop: 'develop',
  stage: 'stage',
  hybrid: 'hybrid',
  prod: 'prod',
} as const;

export type HeaderLogoMode = ValueOf<typeof HEADER_LOGO_MODE>;

export type HeaderLogo = {
  loading?: boolean;
  path?: string;
  mode?: HeaderLogoMode;
};

export type VendorLogo = HeaderLogo & {
  pageUrl: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
};
