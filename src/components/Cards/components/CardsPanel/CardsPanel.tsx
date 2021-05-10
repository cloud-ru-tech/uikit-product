import { FC, useState } from 'react';

import { Paginate, IPaginateProps } from 'components/Paginate';

import * as S from './styled';

export interface ICardsPanelProps {
  className?: string;
  autoFill?: boolean;
  cardsPerRow?: number;
  paginateProps?: IPaginateProps & {
    page: number;
    pageSize: number;
    position?: 'top' | 'bottom';
  };
}

export const CardsPanel: FC<ICardsPanelProps> = ({
  children,
  autoFill,
  className,
  cardsPerRow = 4,
  paginateProps,
}) => {
  const [page, setPage] = useState(paginateProps?.page || 0);
  const isArrayChildren = Array.isArray(children);
  const pagesAmount =
    isArrayChildren && paginateProps
      ? (children as Array<React.ReactNode>).length /
        (paginateProps.pageSize || 1)
      : 0;

  if (paginateProps) {
    return (
      <S.CardsPanel>
        {paginateProps.position === 'top' && pagesAmount > 0 ? (
          <S.PageWrapper>
            <Paginate
              {...paginateProps}
              pageCount={pagesAmount}
              initialPage={page}
              onPageChange={({ selected }) => setPage(selected)}
            />
          </S.PageWrapper>
        ) : null}
        <S.Container
          autoFill={autoFill}
          className={className}
          cardsPerRow={cardsPerRow}
        >
          {isArrayChildren
            ? (children as Array<React.ReactNode>).filter(
                (_card, index) =>
                  index >= page * paginateProps.pageSize &&
                  index < (page + 1) * paginateProps.pageSize,
              )
            : children}
        </S.Container>
        {(paginateProps.position === 'bottom' ||
          paginateProps.position === undefined) &&
        pagesAmount > 0 ? (
          <S.PageWrapper>
            <Paginate
              placement='left'
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
    <S.Container
      autoFill={autoFill}
      className={className}
      cardsPerRow={cardsPerRow}
    >
      {children}
    </S.Container>
  );
};
