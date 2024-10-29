import { useCallback, useState } from 'react';

import { ReleaseNotesModalProps } from './types';

type Props = Pick<ReleaseNotesModalProps, 'onClose' | 'onReadLaterClick'>;

export function useReleaseNotesModal({ onClose, onReadLaterClick }: Props) {
  const [page, setPage] = useState(0);

  const onCloseInner = useCallback(() => {
    setPage(0);
    onClose();
  }, [onClose]);

  const onReadLaterClickInner = useCallback(() => {
    if (!onReadLaterClick) {
      return undefined;
    }

    setPage(0);
    onReadLaterClick();
  }, [onReadLaterClick]);

  const onNextPageClick = useCallback(() => setPage(prevPageIndex => prevPageIndex + 1), []);

  const onPrevPageClick = useCallback(() => setPage(prevPageIndex => prevPageIndex - 1), []);

  return {
    onCloseInner,
    onReadLaterClickInner,
    pageIndex: page,
    readablePageNumber: page + 1,
    setPage,
    onNextPageClick,
    onPrevPageClick,
  };
}
