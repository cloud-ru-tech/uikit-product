import { FC } from 'react';
import { cx } from '@linaria/core';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

import { BackSVG, ForwardSVG } from '@sbercloud/icons';

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
    previousLabel={<BackSVG />}
    nextLabel={<ForwardSVG />}
    breakLabel='...'
    breakClassName={pageClassName}
    breakLinkClassName={cx(pageLinkClassName, pageLinkActiveClassName)}
    containerClassName={cx(paginationClassName, placementStyle[placement])}
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
