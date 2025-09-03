import { useRef } from 'react';

import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Spinner } from '@snack-uikit/loaders';
import { Popover } from '@snack-uikit/popover';
import { Typography } from '@snack-uikit/typography';

import { ContentDislikeCsat, LikeDislikeBlock, PopoverReportContent } from '../../helperComponents';
import styles from './styles.module.scss';

export type SiteCsatPopoverProps = WithLayoutType<{
  loading?: boolean;
  like?: boolean;
  onSetLike: (flag: boolean) => void;
  label: string;
  negativeFeedbackForm: {
    open: boolean;
    onSetOpen: (flag: boolean) => void;
  };
  dislikeCommentForm?: {
    dislikeEnabled: boolean;
    loadingButton?: boolean;
    onClickForm(): void;
    onSubmit(textComment: string): void;
  };
}>;

export function SiteCsatPopover({
  loading,
  like,
  onSetLike,
  layoutType,
  negativeFeedbackForm,
  label,
  dislikeCommentForm,
}: SiteCsatPopoverProps) {
  const isMobile = layoutType === 'mobile';

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenClosePopover = () => {
    negativeFeedbackForm.onSetOpen(!negativeFeedbackForm.open);
  };

  const popover = dislikeCommentForm && (
    <Popover
      tip={
        <PopoverReportContent
          onClickForm={dislikeCommentForm.onClickForm}
          onOpenClosePopover={handleOpenClosePopover}
          onSubmit={dislikeCommentForm.onSubmit}
          loadingButton={dislikeCommentForm.loadingButton}
        />
      }
      open={negativeFeedbackForm.open}
      trigger={'click'}
      placement={'bottom'}
      triggerRef={triggerRef}
    />
  );

  const mobileModal = dislikeCommentForm && (
    <MobileModalCustom open={negativeFeedbackForm.open} onClose={handleOpenClosePopover}>
      <MobileModalCustom.Header title='Спасибо за отзыв!' subtitle='Поделитесь, что именно не так?' />
      <MobileModalCustom.Body
        content={
          <ContentDislikeCsat
            onClickForm={dislikeCommentForm.onClickForm}
            loadingButton={dislikeCommentForm.loadingButton}
            onSubmit={dislikeCommentForm.onSubmit}
            buttonSubmit={{
              size: 'm',
              fullWidth: true,
            }}
          />
        }
      />
    </MobileModalCustom>
  );

  return (
    <>
      <div className={styles.siteCsatPopoverBlock}>
        {!isMobile && <Typography.SansBodyM className={styles.label}>{label}</Typography.SansBodyM>}
        {loading ? (
          <Spinner className={styles.spinner} />
        ) : (
          <LikeDislikeBlock
            dislikeEnabled={dislikeCommentForm?.dislikeEnabled}
            className={styles.likeDislikeBlock}
            onOpenClosePopover={handleOpenClosePopover}
            triggerRef={triggerRef}
            like={like}
            onSetLike={onSetLike}
          />
        )}
      </div>
      {isMobile ? mobileModal : popover}
    </>
  );
}
