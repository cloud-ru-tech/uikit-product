import { ButtonPromoProps } from '@sbercloud/uikit-product-button-predefined';
import { EridProps } from '@sbercloud/uikit-product-site-tag';
import { ValueOf } from '@snack-uikit/utils';

import { HeroSlideMediaProps } from '../HeroSlideMedia';
import { Appearance, Color } from './constants';

type ColorType = ValueOf<typeof Color>;

type AppearanceType = ValueOf<typeof Appearance>;

export type HeroSlideBaseProps = {
  /** id компонента */
  id?: string;
  /** Заголовок*/
  title: string;
  /** Описание */
  description?: string;
  /** Медиа-контент */
  media: HeroSlideMediaProps;
  /** Кнопка ButtonPromo */
  button: Omit<ButtonPromoProps, 'size' | 'appearance' | 'className'>;
  /** Плашка рекламы с tooltip */
  erid?: Pick<EridProps, 'tip' | 'appearance'>;
  /** CSS-класс */
  className?: string;
};

type HeroSlideWithColor = HeroSlideBaseProps & {
  appearance: Exclude<AppearanceType, 'brand' | 'graphite'>;
  color: ColorType;
};

type HeroSlideWithoutColor = HeroSlideBaseProps & {
  appearance: Exclude<AppearanceType, 'decor'>;
  color?: never;
};

export type HeroSlideProps = HeroSlideWithColor | HeroSlideWithoutColor;
