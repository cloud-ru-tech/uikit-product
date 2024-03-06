import { CardServiceSmallProps } from '@sbercloud/uikit-product-card-predefined';

export type ProductProps = Pick<CardServiceSmallProps, 'title' | 'emblem' | 'onClick' | 'promoBadge'>;
