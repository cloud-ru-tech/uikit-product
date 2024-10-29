import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Carousel } from '@snack-uikit/carousel';
import { ModalCustom } from '@snack-uikit/modal';
import { PaginationSlider } from '@snack-uikit/pagination';
import { WithSkeleton } from '@snack-uikit/skeleton';

import { NoteItem, NoteItemSkeleton } from '../../helperComponents/NoteItem';
import { NoteSliderControls } from '../../helperComponents/NoteSliderControls';
import { textProvider, Texts } from '../../helpers';
import { useReleaseNotesModal } from '../../hooks';
import { ReleaseNotesModalProps } from '../../types';
import styles from './styles.module.scss';

export function ReleaseNotesModal({
  open,
  onClose,
  loading,
  items,
  onReadLaterClick,
}: Omit<ReleaseNotesModalProps, 'layoutType'>) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const {
    onCloseInner,
    onReadLaterClickInner,
    pageIndex,
    readablePageNumber,
    onNextPageClick,
    onPrevPageClick,
    setPage,
  } = useReleaseNotesModal({ onClose, onReadLaterClick });

  return (
    <ModalCustom open={open} onClose={onCloseInner} size='m'>
      <ModalCustom.Header title={textProvider<string>(languageCode, Texts.WhatsNew)} />
      <ModalCustom.Body
        content={
          <WithSkeleton loading={loading} skeleton={<NoteItemSkeleton />}>
            <Carousel arrows={false} pagination={false} state={{ page: pageIndex, onChange: setPage }}>
              {items.map(item => (
                <NoteItem key={item.title} {...item} />
              ))}
            </Carousel>
          </WithSkeleton>
        }
      />
      <ModalCustom.Footer
        actions={
          <div className={styles.footerActions}>
            <div className={styles.footerLeft}>
              {onReadLaterClick && (
                <ButtonFunction
                  label={textProvider<string>(languageCode, Texts.ReadLater)}
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
                      onChange={page => setPage(page - 1)}
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
    </ModalCustom>
  );
}
