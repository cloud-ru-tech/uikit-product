import { useCallback, useMemo } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonFunction } from '@snack-uikit/button';
import { Carousel } from '@snack-uikit/carousel';
import { ModalCustom } from '@snack-uikit/modal';
import { PaginationSlider } from '@snack-uikit/pagination';
import { WithSkeleton } from '@snack-uikit/skeleton';

import { DataErrorInfoBlock, NoDataInfoBlock } from '../../helperComponents';
import { NoteItem, NoteItemSkeleton } from '../../helperComponents/NoteItem';
import { NoteSliderControls } from '../../helperComponents/NoteSliderControls';
import { useReleaseNotesModal } from '../../hooks';
import { ReleaseNotesModalProps } from '../../types';
import styles from './styles.module.scss';

export function ReleaseNotesModal({
  open,
  onClose,
  loading,
  items,
  onReadLaterClick,
  dataError,
  onDataErrorRetryClick,
  onSlideChange,
}: ReleaseNotesModalProps) {
  const { t } = useLocale('ModalPredefined');
  const {
    onCloseInner,
    onReadLaterClickInner,
    pageIndex,
    readablePageNumber,
    onNextPageClick,
    onPrevPageClick,
    setPage,
  } = useReleaseNotesModal({ onClose, onReadLaterClick, onSlideChange });

  const handleSlideChange = useCallback(
    (slide: number) => {
      setPage(slide);

      onSlideChange?.(slide);
    },
    [onSlideChange, setPage],
  );

  const content = useMemo(() => {
    if (dataError) {
      return <DataErrorInfoBlock onDataErrorRetryClick={onDataErrorRetryClick} />;
    }

    if (!loading && items.length < 1) {
      return <NoDataInfoBlock />;
    }

    return (
      <WithSkeleton loading={loading} skeleton={<NoteItemSkeleton />}>
        <Carousel
          className={styles.carousel}
          arrows={false}
          pagination={false}
          state={{
            page: pageIndex,
            onChange: handleSlideChange,
          }}
          swipe={items.length > 1}
        >
          {items.map(item => (
            <NoteItem key={item.title} {...item} />
          ))}
        </Carousel>
      </WithSkeleton>
    );
  }, [dataError, handleSlideChange, items, loading, onDataErrorRetryClick, pageIndex]);

  const showFooter = useMemo(() => {
    if (loading) {
      return true;
    }

    return Boolean(!dataError && items.length > 0);
  }, [dataError, items.length, loading]);

  return (
    <ModalCustom open={open} onClose={onCloseInner} size='m'>
      <ModalCustom.Header title={t('whatsNew')} />
      <ModalCustom.Body content={content} />
      {showFooter && (
        <ModalCustom.Footer
          actions={
            <div className={styles.footerActions}>
              <div className={styles.footerLeft}>
                {onReadLaterClick && (
                  <ButtonFunction
                    label={t('readLater')}
                    onClick={onReadLaterClickInner}
                    size='m'
                    appearance='neutral'
                    disabled={loading}
                  />
                )}
              </div>
              {items.length > 1 && (
                <>
                  {!loading && (
                    <div className={styles.footerCenter}>
                      <PaginationSlider
                        page={readablePageNumber}
                        onChange={page => handleSlideChange(page - 1)}
                        total={items.length}
                      />
                    </div>
                  )}
                  <div className={styles.footerRight}>
                    <NoteSliderControls
                      page={readablePageNumber}
                      totalPages={items.length}
                      onNextSlideClick={onNextPageClick}
                      onPrevSlideClick={onPrevPageClick}
                    />
                  </div>
                </>
              )}
            </div>
          }
        />
      )}
    </ModalCustom>
  );
}
