import { ReactNode } from 'react';

import { TagProps } from '@snack-uikit/tag';

export type ProductCategory = {
  id: string;
  name?: string;
  title: string;
  slug: string;
};

export type ContentType = 'catalog' | 'solutions' | 'list' | 'link';

export type ListGridType = 'three' | 'four';

export type InfoType = {
  title: string;
  text?: string;
  link?: {
    href: string;
    title: string;
  };
  onClickForClose?(): void;
};

type Appearance = TagProps['appearance'];

export type TagType = {
  title: string;
  appearance?: Appearance;
};

type ItemsBaseProps = {
  title: string;
  link: string;
};

type LinkItemsProps = ItemsBaseProps & {
  type: 'default';
  text: string;
  tags?: TagType[];
  isButton?: boolean;
  target?: '_blank' | '_self';
  icon: string | ReactNode;
};

type OfferItemsProps = ItemsBaseProps & {
  type: 'offers';
  theme?: string;
  icon?: string | ReactNode;
};

type PlatformItemsProps = ItemsBaseProps & {
  type: 'platform';
  clickzone: 'search' | 'body' | 'footer' | 'header' | 'catalog-search';
  linkText: string;
  theme?: string;
  text?: string;
};

type Item = LinkItemsProps | OfferItemsProps | PlatformItemsProps;

export type ListType = {
  title?: string;
  subtitle?: {
    title: string;
    link?: string;
    icon?: string | ReactNode;
  };
  items: Item[];
}[];

export type CardType = {
  link: string;
  title: string;
  icon: string;
  text?: string;
  serviceTitle?: string;
  isPlatformCard?: boolean;
  onClickForClose?(): void;
  platformName?: string;
  tags?: {
    appearance: Appearance;
    title: string;
  }[];
};

export type ProductPlatform = 'Облако VMware' | 'Evolution' | 'Advanced' | 'Кроссплатформенные сервисы' | 'ML Space';

export type ProductPlatformType = {
  id: string;
  title: ProductPlatform | string; // TODO remove string
  slug: string;
};

export type SearchClickAnalyticsSource = 'all' | 'filter' | 'e-search';

export type CatalogProduct = {
  id?: string;
  type: 'products' | 'solutions' | 'services';
  solutionType?: 'tasks' | 'industry';
  title: string;
  slug: string;
  icon: string;
  productPlatforms: ProductPlatformType[];
  markTitle?: string;
  description?: string;
  customLink?: string;
  available?: boolean;
  iconDark?: string;
  cover?: string;
  categories?: ProductCategory[] | null;
  buttonTitle?: string;
  bannerIcon?: string;
  analyticSource?: SearchClickAnalyticsSource;
};

export type ProductsType = {
  onClickForClose?(): void;
  products: CatalogProduct[];
  categories: ProductCategory[];
};

export type SolutionCategory = {
  id: number | string;
  title: string;
  slug: string;
};

export type SolutionsData = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  buttonTitle: string;
  categories: SolutionCategory[];
  disabled?: boolean;
};

export type SolutionsType = {
  categories: SolutionCategory[];
  items: SolutionsData[];
  onClickForClose?(): void;
};

export type CategoryType = ProductCategory & {
  src?: string;
  description?: string;
};

export type ProductsSectionProps = {
  products: {
    items: CatalogProduct[];
    categories: CategoryType[];
  };
  onClickForClose?(): void;
};

export type MenuItemsType = {
  id: string;
  title: string;
  type: ContentType;
  infoBlock?: InfoType;
  target?: string;
  links?: {
    title: string;
    text: string;
    link: string;
  }[][];
  catalogItems?: ProductsType;
  solutions?: SolutionsType;
  list?: ListType;
  link?: string;
  gridColumns?: ListGridType;
}[];
