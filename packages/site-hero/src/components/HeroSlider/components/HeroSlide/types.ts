import { HTMLAttributeAnchorTarget, MouseEventHandler } from 'react';

import { EridProps } from '@cloud-ru/uikit-product-site-tag';
import { ValueOf } from '@snack-uikit/utils';

import { HeroSlideMediaProps } from '../HeroSlideMedia';
import { Appearance, Color } from './constants';

type ColorType = ValueOf<typeof Color>;

export type AppearanceType = ValueOf<typeof Appearance>;

export type HeroSlideBaseProps = {
  /** id компонента */
  id?: string;
  /** Заголовок*/
  title: string;
  /** Описание */
  description?: string;
  /** Медиа-контент */
  media: HeroSlideMediaProps;
  /** Кнопка CTA */
  button: {
    /** Текст кнопки */
    label: string;
    /** Ссылка */
    href: string;
    /** Как открывать ссылку */
    target?: HTMLAttributeAnchorTarget;
    /** Обработчик клика по кнопке */
    onClick?: MouseEventHandler<HTMLElement>;
  };
  /** Плашка рекламы с tooltip */
  erid?: Pick<EridProps, 'tip'> & {
    place: 'tooltip' | 'under-button';
  };
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
