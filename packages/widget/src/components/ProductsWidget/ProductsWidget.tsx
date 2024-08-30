import { ReactNode, useMemo, useState } from 'react';

import { ArrowLeftSVG, ArrowRightSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, useLanguage, useMatchMedia, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Carousel } from '@snack-uikit/carousel';
import { Typography } from '@snack-uikit/typography';

import { textProvider, Texts } from '../../helpers';
import { COLUMN_SIZE, MOBILE_COLUMN_SIZE, MOBILE_ROW_SIZE, ROW_SIZE } from './constants';
import * as S from './styled';
import { getLoadingCards } from './utils/getLoadingCards';
import { getProductColumns } from './utils/getProductColumns';

export type ProductsWidgetProps = WithSupportProps<{
  loading?: boolean;
  cards: ReactNode[];
  columnSize?: number;
  rowSize?: number;
}>;

export function ProductsWidget({
  cards = [],
  loading = false,
  columnSize: columnSizeProp = COLUMN_SIZE,
  rowSize: rowSizeProp = ROW_SIZE,
  ...rest
}: ProductsWidgetProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const { isMobile } = useMatchMedia();
  const columnSize = isMobile ? MOBILE_COLUMN_SIZE : columnSizeProp;
  const rowSize = isMobile ? MOBILE_ROW_SIZE : rowSizeProp;

  const [page, setPage] = useState(0);

  const productsCards = useMemo(
    () => (loading ? getLoadingCards({ columnSize, rowSize }) : getProductColumns({ cards, columnSize, rowSize })),
    [columnSize, loading, cards, rowSize],
  );

  const totalPages = productsCards.length;

  return (
    <S.Wrapper {...extractSupportProps(rest)}>
      <S.HeaderWrapper>
        <Typography.SansTitleL tag='h5'>{textProvider(languageCode, Texts.ProductsWidgetTitle)}</Typography.SansTitleL>

        {isMobile && (
          <S.ArrowWrapper style={{ display: 'flex' }}>
            <S.PageNumber>{page + 1}</S.PageNumber>

            <S.PageTotal>/{totalPages}</S.PageTotal>

            <ButtonFunction
              icon={<ArrowLeftSVG />}
              onClick={() => setPage(page - 1 >= 0 ? page - 1 : totalPages - 1)}
            />
            <ButtonFunction icon={<ArrowRightSVG />} onClick={() => setPage(page + 1 < totalPages ? page + 1 : 0)} />
          </S.ArrowWrapper>
        )}
      </S.HeaderWrapper>

      <Carousel
        gap='8px'
        infiniteScroll
        swipe={isMobile}
        showItems={rowSize}
        scrollBy={rowSize}
        arrows={!isMobile}
        pagination={!isMobile}
        state={{ page, onChange: setPage }}
      >
        {productsCards.map((d, index) => (
          <S.Column key={index}>{d}</S.Column>
        ))}
      </Carousel>
    </S.Wrapper>
  );
}
