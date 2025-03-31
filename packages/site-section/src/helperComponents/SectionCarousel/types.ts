import { ReactElement } from 'react';

import { WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { CarouselProps } from '@snack-uikit/carousel';

import { SectionBasicProps } from '../../components';
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
        /**
         * Автоматическое переключение слайдов в секундах
         * @default 9
         */
        autoSwipe?: number;
      } & Pick<CarouselProps, 'gap' | 'autoSwipe' | 'infiniteScroll'> &
      Pick<SectionBasicProps, 'moreButton'>
  >
>;

export type LimitedSectionCarouselProps<T extends object> = Omit<SectionCarouselProps, keyof CarouselSlideConfig> & {
  /** Массив айтемов */
  items: T[];
};
