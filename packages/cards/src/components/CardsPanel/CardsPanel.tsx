import { useEffect, useState } from 'react';

import { Pagination } from '@sbercloud/uikit-product-pagination-private';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type CardsPanelProps = {
  className?: string;
  autoFill?: boolean;
  cardsPerRow?: number;
  paginateProps?: {
    page: number;
    pageSize: number;
    position?: 'top' | 'bottom';
  };
  children?: React.ReactNode;
};
//TODO: Переписать
export function CardsPanel({
  children,
  autoFill,
  className,
  cardsPerRow = 4,
  paginateProps,
  ...rest
}: WithSupportProps<CardsPanelProps>) {
  const [page, setPage] = useState(paginateProps?.page || 0);
  const isArrayChildren = Array.isArray(children);
  const pagesAmount =
    isArrayChildren && paginateProps
      ? Math.ceil((children as Array<React.ReactNode>).length / (paginateProps.pageSize || 1))
      : 0;

  function handlePageChange(page: number) {
    setPage(page - 1);
  }

  useEffect(() => {
    if (pagesAmount > 0 && page > pagesAmount - 1) {
      setPage(pagesAmount - 1);
    }
  }, [pagesAmount, page]);

  if (paginateProps) {
    return (
      <S.CardsPanel {...extractSupportProps(rest)}>
        {paginateProps.position === 'top' && pagesAmount > 1 ? (
          <S.PageWrapper data-test-id='card-panel__paginate'>
            <Pagination total={pagesAmount} page={page + 1} onChange={handlePageChange} />
          </S.PageWrapper>
        ) : null}
        <S.Container autoFill={autoFill} className={className} cardsPerRow={cardsPerRow}>
          {isArrayChildren
            ? (children as Array<React.ReactNode>).filter(
                (_card, index) => index >= page * paginateProps.pageSize && index < (page + 1) * paginateProps.pageSize,
              )
            : children}
        </S.Container>
        {(paginateProps.position === 'bottom' || paginateProps.position === undefined) && pagesAmount > 1 ? (
          <S.PageWrapper data-test-id='card-panel__paginate'>
            <Pagination total={pagesAmount} page={page + 1} onChange={handlePageChange} />
          </S.PageWrapper>
        ) : null}
      </S.CardsPanel>
    );
  }

  return (
    <S.Container autoFill={autoFill} className={className} cardsPerRow={cardsPerRow} {...extractSupportProps(rest)}>
      {children}
    </S.Container>
  );
}
