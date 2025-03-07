import { ReactElement } from 'react';

import { WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { CarouselProps } from '@snack-uikit/carousel';

import { SectionColor } from '../../types';
import { SectionTitleProps } from '../SectionTitle';

type CarouselSlideConfig = {
  /** Массив повторяющихся айтмов, из которых состоят слайды карусели */
  children: ReactElement[];
  /** Минимальная ширина айтема */
  itemMinWidth: number;
  /** Максимальное количество айтемов на слайде */
  maxItemsPerPage: number;
};

export type SectionCarouselProps = WithSupportProps<
  WithLayoutType<
    SectionTitleProps &
      CarouselSlideConfig & {
        /** id секции */
        id?: string;
        /** Цвет фона */
        backgroundColor?: SectionColor;
        /** CSS - класснейм */
        className?: string;
      } & Pick<CarouselProps, 'gap'>
  >
>;

export type LimitedSectionCarouselProps<T extends object> = Omit<SectionCarouselProps, keyof CarouselSlideConfig> & {
  /** Массив айтемов */
  items: T[];
};
