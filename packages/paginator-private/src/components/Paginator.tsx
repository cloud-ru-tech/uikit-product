import { cx } from '@linaria/core';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

import { ArrowBoldLeftInterfaceSVG, ArrowBoldRightInterfaceSVG } from '@sbercloud/uikit-react-icons';

import {
  iconLinkClassName,
  pageActiveClassName,
  pageClassName,
  pageLinkActiveClassName,
  pageLinkClassName,
  paginationClassName,
  placementStyle,
} from './styled';

enum Placements {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type PaginatorProps = Partial<ReactPaginateProps> & {
  placement?: Placements;
};

export function Paginator({ pageCount = 1, placement = Placements.Left, ...props }: PaginatorProps) {
  return (
    <ReactPaginate
      previousLabel={<ArrowBoldLeftInterfaceSVG />}
      nextLabel={<ArrowBoldRightInterfaceSVG />}
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
}
Paginator.placements = Placements;
