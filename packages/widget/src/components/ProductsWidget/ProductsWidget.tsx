import { useMemo } from 'react';

import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Carousel } from '@snack-uikit/carousel';
import { Typography } from '@snack-uikit/typography';

import { textProvider, Texts } from '../../helpers';
import { ROW_SIZE } from './constants';
import * as S from './styled';
import { ProductProps } from './types';
import { getLoadingCards } from './utils/getLoadingCards';
import { getProductColumns } from './utils/getProductColumns';

export type ProductsWidgetProps = WithSupportProps<{
  loading?: boolean;
  products: ProductProps[];
  columnSize?: number;
  rowSize?: number;
}>;

export function ProductsWidget({ products, loading = false, columnSize, rowSize, ...rest }: ProductsWidgetProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const productsCards = useMemo(
    () =>
      loading
        ? getLoadingCards({ columnSize, rowSize })
        : getProductColumns({ products: products ?? [], columnSize, rowSize }),
    [columnSize, loading, products, rowSize],
  );

  return (
    <S.Wrapper {...extractSupportProps(rest)}>
      <Typography.SansTitleL tag='h5'>{textProvider(languageCode, Texts.ProductsWidgetTitle)}</Typography.SansTitleL>
      <Carousel
        gap='8px'
        infiniteScroll
        swipe={false}
        showItems={ROW_SIZE}
        scrollBy={ROW_SIZE}
        key={String(loading) + columnSize + rowSize}
      >
        {productsCards.map((d, index) => (
          <S.Column key={index}>{d}</S.Column>
        ))}
      </Carousel>
    </S.Wrapper>
  );
}
