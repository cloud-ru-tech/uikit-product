import { FooterLink, LinksGroup, PinnedCard, ProductOption } from '../../types';
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
  pinnedCards?: PinnedCard[];
  footerLinks?: FooterLink[];
  favorites?: {
    value: string[];
    onChange(id: string): (value: boolean) => void;
  };
} & SelectProductsProps;
