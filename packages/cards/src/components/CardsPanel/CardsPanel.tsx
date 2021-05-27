import { FC, useState } from 'react';

import { Paginator, PaginatorProps } from '@sbercloud/uikit-react-paginator-private';

import * as S from './styled';

export type CardsPanelProps = {
  className?: string;
  autoFill?: boolean;
  cardsPerRow?: number;
  paginateProps?: PaginatorProps & {
    page: number;
    pageSize: number;
    position?: 'top' | 'bottom';
  };
};

export const CardsPanel: FC<CardsPanelProps> = ({ children, autoFill, className, cardsPerRow = 4, paginateProps }) => {
  const [page, setPage] = useState(paginateProps?.page || 0);
  const isArrayChildren = Array.isArray(children);
  const pagesAmount =
    isArrayChildren && paginateProps ? (children as Array<React.ReactNode>).length / (paginateProps.pageSize || 1) : 0;

  if (paginateProps) {
    return (
      <S.CardsPanel>
        {paginateProps.position === 'top' && pagesAmount > 1 ? (
          <S.PageWrapper>
            <Paginator
              {...paginateProps}
              pageCount={pagesAmount}
              initialPage={page}
              onPageChange={({ selected }) => setPage(selected)}
            />
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
          <S.PageWrapper>
            <Paginator
              placement={Paginator.placements.Left}
              {...paginateProps}
              pageCount={pagesAmount}
              initialPage={page}
              onPageChange={({ selected }) => setPage(selected)}
            />
          </S.PageWrapper>
        ) : null}
      </S.CardsPanel>
    );
  }

  return (
    <S.Container autoFill={autoFill} className={className} cardsPerRow={cardsPerRow}>
      {children}
    </S.Container>
  );
};
