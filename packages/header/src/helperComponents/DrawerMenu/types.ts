import { MouseEvent } from 'react';

import { FooterLink, LinksGroup, ProductOption } from '../../types';
import { ItemsGroup } from '../GroupSection';

export type SelectProductsProps = {
  allProducts: ItemsGroup<ProductOption>[];
  onProductChange(product: ProductOption): void;
  selectedProduct: ProductOption;
  closeDropList?(): void;
};

export type DrawerMenuProps = {
  open: boolean;
  onClose(): void;
  links?: LinksGroup[];
  selectedLink?: string;
  onLinkChange?(value: string): void;
  footerLinks?: FooterLink[];
  favorites?: {
    value: string[];
    onChange(id: string): (value: boolean) => void;
  };
  onMarketplaceBannerClick?(e?: MouseEvent<HTMLElement>): void;
} & SelectProductsProps;
