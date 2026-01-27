import { JSXElementConstructor, MouseEvent, MouseEventHandler, ReactNode } from 'react';

import { CardServiceSmallProps } from '@cloud-ru/uikit-product-card-predefined';
import { ListProps } from '@snack-uikit/list';

import { SearchProps } from './Search/types';

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
  aliases: string[];
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

export type MainMenuProps = {
  open?: boolean;
  setOpen?(open: boolean): void;

  leftTop?: ReactNode;
  rightTop?: ReactNode;

  settingItems: ListProps['items'];
  serviceGroups: LinksGroup[];

  onLinkChange?(value: string): void;

  favorite?: {
    value: string[];
    onChange: (productId: string) => (addingValue: boolean) => void;
  };

  search?: SearchProps;

  isMobile?: boolean;
};
