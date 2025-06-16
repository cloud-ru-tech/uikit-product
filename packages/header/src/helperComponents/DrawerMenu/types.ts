import { MouseEvent } from 'react';

import { FooterLink, LinksGroup, ProductOption } from '../../types';
import { ItemsGroup } from '../SelectMenu';

export type SelectProductsProps = {
  allProducts: ItemsGroup<ProductOption>[];
  onProductChange(product: ProductOption, e: MouseEvent<HTMLAnchorElement>): void;
  selectedProduct: ProductOption;
  closeDropList?(): void;
};

export type DrawerMenuProps = {
  open: boolean;
  onClose(): void;
  links?: LinksGroup[];
  selectedLink?: string;
  onLinkChange?(value: string): void;
  onSearchChange?(value: string): void;
  footerLinks?: FooterLink[];
  favorites?: {
    value: string[];
    onChange(id: string): (value: boolean) => void;
  };
  marketplaceBanner?: {
    onClick(e?: MouseEvent<HTMLElement>): void;
    href: string;
  };
  referralBanner?: {
    onClick?(e?: MouseEvent<HTMLElement>): void;
    href: string;
  };
  hideProductSelect?: boolean;
} & SelectProductsProps;
