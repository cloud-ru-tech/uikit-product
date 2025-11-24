import { useRef } from 'react';

import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Spinner } from '@snack-uikit/loaders';
import { Popover } from '@snack-uikit/popover';
import { Typography } from '@snack-uikit/typography';

import { ContentDislikeCsat, LikeDislikeBlock, PopoverReportContent } from '../../helperComponents';
import { onSubmitVariables } from '../../types';
import styles from './styles.module.scss';

export type SiteCsatPopoverProps = WithLayoutType<{
  /** Отображение Spinner */
  loading?: boolean;
  /** Состояние отображение лайка: лайк, дизлайк или ничего не выбрано */
  like?: boolean;
  /** Обработчик нажатия на лайк или дизлайк */
  onSetLike: (flag: boolean) => void;
  /** Текст рядом с кнопками */
  label: string;
  /** Данные поповера */
  negativeFeedbackForm: {
    /** Флаг открытости поповера */
    open: boolean;
    /** Обработчик открытия или закрытия поповера */
    onSetOpen: (flag: boolean) => void;
  };
  /** Выбор версии компонента, сделано для a/b тестирования, после тестирования этот prop удалится */
  showNewAppearance?: boolean;
  /** Данные для заполнения формы фидбэка */
  dislikeCommentForm?: {
    /** Доступно ли нажатие на дизлайк */
    dislikeEnabled: boolean;
    /** Состояние загрузки кнопки отправки */
    loadingButton?: boolean;
    /** Обработчик нажатия на форму */
    onClickForm(): void;
    /** Обработчик нажатия на chips */
    onCheckChips?(titleChip: string): void;
    /** Обработчик onSubmit формы */
    onSubmit({ textComment, selectedChips }: onSubmitVariables): void;
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
  showNewAppearance = false,
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
          onCheckChips={dislikeCommentForm.onCheckChips}
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
            onCheckChips={dislikeCommentForm.onCheckChips}
            buttonSubmit={{
              size: 'm',
              fullWidth: true,
            }}
          />
        }
      />
    </MobileModalCustom>
  );

  const title =
    like === true || (like !== undefined && !dislikeCommentForm?.dislikeEnabled) ? 'Спасибо за отзыв!' : label;

  return (
    <>
      <div className={styles.siteCsatPopoverBlock}>
        {!isMobile &&
          (showNewAppearance ? (
            <Typography.SansTitleM className={styles.labelNewAppearance}>{title}</Typography.SansTitleM>
          ) : (
            <Typography.SansBodyM className={styles.label}>{label}</Typography.SansBodyM>
          ))}
        {loading ? (
          <Spinner className={styles.spinner} />
        ) : (
          <LikeDislikeBlock
            showNewAppearance={showNewAppearance}
            dislikeEnabled={dislikeCommentForm?.dislikeEnabled}
            className={styles.likeDislikeBlock}
            onOpenClosePopover={handleOpenClosePopover}
            triggerRef={triggerRef}
            like={like}
            onSetLike={onSetLike}
            hideTextLabel={isMobile}
          />
        )}
      </div>
      {isMobile ? mobileModal : popover}
    </>
  );
}
