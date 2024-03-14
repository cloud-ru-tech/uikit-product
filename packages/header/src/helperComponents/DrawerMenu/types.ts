import { FooterLink, LinksGroup, PinnedCard, ProductOption } from '../../types';
import { ItemsGroup } from '../GroupSection';

export type SelectProductsProps = {
  allProducts: ItemsGroup<ProductOption>[];
  onProductChange(product: ProductOption): void;
  selectedProduct: ProductOption;
};

export type DrawerMenuProps = {
  open: boolean;
  onClose(): void;
  links?: LinksGroup[];
  selectedLink?: string;
  onLinkChange?(value: string): void;
  pinnedCards?: PinnedCard[];
  footerLinks?: FooterLink[];
} & SelectProductsProps;
