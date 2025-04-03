import { PromoTagProps } from '@snack-uikit/promo-tag';

export type Appearance = NonNullable<Exclude<PromoTagProps['appearance'], 'primary' | 'yellow'>>;
