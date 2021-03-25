import { FC } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import clsx from 'clsx';

import { LeftSVG, RightSVG } from '@aicloud/ui-icons';

import {
  pageClassName,
  placementStyle,
  pageLinkClassName,
  iconLinkClassName,
  pageActiveClassName,
  paginationClassName,
  pageLinkActiveClassName,
} from './styled';

export type IPaginateProps = Partial<ReactPaginateProps> & {
  placement?: 'left' | 'center' | 'right';
};

export const Paginate: FC<IPaginateProps> = ({
  pageCount = 1,
  placement = 'left',
  ...props
}) => (
  <ReactPaginate
    previousLabel={<LeftSVG size={36} />}
    nextLabel={<RightSVG size={36} />}
    breakLabel='...'
    breakClassName={pageClassName}
    breakLinkClassName={clsx(pageLinkClassName, pageLinkActiveClassName)}
    containerClassName={clsx(paginationClassName, placementStyle[placement])}
    pageClassName={pageClassName}
    pageLinkClassName={pageLinkClassName}
    activeLinkClassName={pageActiveClassName}
    previousLinkClassName={iconLinkClassName}
    nextLinkClassName={iconLinkClassName}
    marginPagesDisplayed={1}
    pageRangeDisplayed={3}
    pageCount={pageCount}
    {...props}
  />
);
