import { FC, useState } from 'react';

import { Paginate, IPaginateProps } from 'components/Paginate';

import { ContainerStyled } from './styled';

export interface ICardsPanelProps {
  className?: string;
  autoFill?: boolean;
  cardsPerRow?: number;
  paginateProps?: Partial<IPaginateProps> & {
    page: number;
    pageSize: number;
    position: 'top' | 'bottom';
  };
}

export const CardsPanel: FC<ICardsPanelProps> = ({
  children,
  autoFill,
  className,
  cardsPerRow = 4,
  paginateProps,
}) => {
  const [page, setPage] = useState(paginateProps.page);
  const isArrayChildren = Array.isArray(children);
  const pagesAmount =
    isArrayChildren && paginateProps
      ? (children as Array<React.ReactNode>).length /
        (paginateProps.pageSize || 1)
      : 0;

  if (paginateProps) {
    return (
      <ContainerStyled
        autoFill={autoFill}
        className={className}
        cardsPerRow={cardsPerRow}
      >
        {paginateProps.position === 'top' ? (
          <Paginate
            {...paginateProps}
            pageCount={pagesAmount}
            initialPage={page}
            onPageChange={({ selected }) => setPage(selected)}
          />
        ) : null}
        {isArrayChildren
          ? (children as Array<React.ReactNode>).filter(
              (_card, index) =>
                index >= page * paginateProps.pageSize &&
                index < (page + 1) * paginateProps.pageSize,
            )
          : children}
        {paginateProps.position === 'bottom' ? (
          <Paginate
            {...paginateProps}
            pageCount={pagesAmount}
            initialPage={page}
            onPageChange={({ selected }) => setPage(selected)}
          />
        ) : null}
      </ContainerStyled>
    );
  }

  return (
    <ContainerStyled
      autoFill={autoFill}
      className={className}
      cardsPerRow={cardsPerRow}
    >
      {children}
    </ContainerStyled>
  );
};
