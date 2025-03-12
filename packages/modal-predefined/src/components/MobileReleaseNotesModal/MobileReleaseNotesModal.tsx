import { useCallback, useMemo, useRef, useState } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { ButtonFunction } from '@snack-uikit/button';
import { Carousel } from '@snack-uikit/carousel';
import { WithSkeleton } from '@snack-uikit/skeleton';
import { Typography } from '@snack-uikit/typography';

import { DataErrorInfoBlock, NoDataInfoBlock } from '../../helperComponents';
import { NoteItemMobile, NoteItemMobileSkeleton } from '../../helperComponents/NoteItemMobile';
import { NoteSliderControls } from '../../helperComponents/NoteSliderControls';
import { useReleaseNotesModal } from '../../hooks';
import { ReleaseNotesModalProps } from '../../types';
import styles from './styles.module.scss';

export function MobileReleaseNotesModal({
  items,
  loading,
  open,
  onClose,
  onReadLaterClick,
  dataError,
  onDataErrorRetryClick,
}: Omit<ReleaseNotesModalProps, 'layoutType'>) {
  const { t } = useLocale('ModalPredefined');
  const {
    onCloseInner,
    onReadLaterClickInner,
    pageIndex,
    readablePageNumber,
    onNextPageClick,
    onPrevPageClick,
    setPage,
  } = useReleaseNotesModal({ onClose, onReadLaterClick });
  const childrenScrollRefs = useRef<Array<HTMLDivElement>>([]);
  const [, setInitialized] = useState(false);

  const onScrollRefInitialized = useCallback(() => setInitialized(true), []);

  const content = useMemo(() => {
    if (dataError) {
      return (
        <div className={styles.infoBlockWrapper}>
          <DataErrorInfoBlock isMobile onDataErrorRetryClick={onDataErrorRetryClick} />
        </div>
      );
    }

    if (!loading && items.length < 1) {
      return (
        <div className={styles.infoBlockWrapper}>
          <NoDataInfoBlock isMobile />
        </div>
      );
    }

    return (
      <WithSkeleton loading={loading} skeleton={<NoteItemMobileSkeleton />}>
        <Carousel
          arrows={false}
          pagination={false}
          swipe
          state={{ page: pageIndex, onChange: setPage }}
          className={styles.mobileCarousel}
        >
          {items.map((item, index) => (
            <NoteItemMobile
              key={item.title}
              {...item}
              childrenScrollRefs={childrenScrollRefs}
              index={index}
              onScrollRefInitialized={onScrollRefInitialized}
            />
          ))}
        </Carousel>
      </WithSkeleton>
    );
  }, [dataError, items, loading, onDataErrorRetryClick, onScrollRefInitialized, pageIndex, setPage]);

  const showFooter = useMemo(() => {
    if (loading) {
      return true;
    }

    return Boolean(!dataError && items.length > 0);
  }, [dataError, items.length, loading]);

  return (
    <MobileModalCustom open={open} onClose={onCloseInner} size='full' closeButtonEnabled>
      <MobileModalCustom.Header title={t('whatsNew')} />

      <MobileModalCustom.Body className={loading ? undefined : styles.mobileBody} content={content} />

      {showFooter && (
        <MobileModalCustom.Footer
          actions={
            <div className={styles.footerActions}>
              <div>
                {onReadLaterClick && (
                  <ButtonFunction
                    label={t('readLater')}
                    onClick={onReadLaterClickInner}
                    size='m'
                    appearance='destructive'
                    disabled={loading}
                    fullWidth
                  />
                )}
              </div>

              {items.length > 1 && (
                <div className={styles.footerRight}>
                  <Typography.SansBodyM className={styles.pageCounter}>
                    {readablePageNumber} {t('outOf')} {items.length}
                  </Typography.SansBodyM>
                  <NoteSliderControls
                    page={readablePageNumber}
                    totalPages={items.length}
                    onNextSlideClick={onNextPageClick}
                    onPrevSlideClick={onPrevPageClick}
                  />
                </div>
              )}
            </div>
          }
        />
      )}
    </MobileModalCustom>
  );
}
