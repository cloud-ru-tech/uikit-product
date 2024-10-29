import { useCallback, useRef, useState } from 'react';

import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Carousel } from '@snack-uikit/carousel';
import { WithSkeleton } from '@snack-uikit/skeleton';
import { Typography } from '@snack-uikit/typography';

import { NoteItemMobile, NoteItemMobileSkeleton } from '../../helperComponents/NoteItemMobile';
import { NoteSliderControls } from '../../helperComponents/NoteSliderControls';
import { textProvider, Texts } from '../../helpers';
import { useReleaseNotesModal } from '../../hooks';
import { ReleaseNotesModalProps } from '../../types';
import styles from './styles.module.scss';

export function MobileReleaseNotesModal({
  items,
  loading,
  open,
  onClose,
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
  const childrenScrollRefs = useRef<Array<HTMLDivElement>>([]);
  const [, setInitialized] = useState(false);

  const onScrollRefInitialized = useCallback(() => setInitialized(true), []);

  return (
    <MobileModalCustom
      open={open}
      onClose={onCloseInner}
      size='full'
      scrollRef={{ current: childrenScrollRefs.current?.[pageIndex] }}
      closeButtonEnabled
      swipeEnabled={false}
    >
      <MobileModalCustom.Header title={textProvider<string>(languageCode, Texts.WhatsNew)} />

      <MobileModalCustom.Body
        className={loading ? undefined : styles.mobileBody}
        content={
          <WithSkeleton loading={loading} skeleton={<NoteItemMobileSkeleton />}>
            <Carousel
              arrows={false}
              pagination={false}
              swipe={false}
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
        }
      />

      <MobileModalCustom.Footer
        actions={
          <div className={styles.footerActions}>
            <div>
              {onReadLaterClick && (
                <ButtonFunction
                  label={textProvider<string>(languageCode, Texts.ReadLater)}
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
                  {readablePageNumber} {textProvider<string>(languageCode, Texts.OutOf)} {items.length}
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
    </MobileModalCustom>
  );
}
