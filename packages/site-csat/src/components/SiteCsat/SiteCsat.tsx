import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { CheckFilledSVG } from '@snack-uikit/icons';
import { Spinner } from '@snack-uikit/loaders';
import { Typography } from '@snack-uikit/typography';

import { ContentDislikeCsat, LikeDislikeBlock } from '../../helperComponents';
import { onSubmitVariables } from '../../types';
import styles from './styles.module.scss';

export type SiteCsatProps = WithLayoutType<{
  /** Отображение Spinner */
  isLoading?: boolean;
  /** Состояние отображение лайка: лайк, дизлайк или ничего не выбрано */
  like?: boolean;
  /** Обработчик нажатия на лайк или дизлайк */
  onSetLike: (flag: boolean) => void;
  /** Текст рядом с кнопками */
  label: string;
  /** Выбор версии компонента, сделано для a/b тестирования, после тестирования этот prop удалится */
  showNewAppearance?: boolean;
  /** Данные для заполнения формы фидбэка */
  dislikeCommentForm?: {
    /** Открыта или закрыт форма */
    open: boolean;
    /** Доступно ли нажатие на дизлайк */
    dislikeEnabled?: boolean;
    /** Состояние загрузки кнопки отправки */
    loadingButton?: boolean;
    /** Обработчик нажатия на форму */
    onClickForm(): void;
    /** Обработчик onSubmit формы */
    onSubmit({ textComment, selectedChips }: onSubmitVariables): void;
    /** Обработчик нажатия на chips */
    onCheckChips?(titleChip: string): void;
  };
}>;

export function SiteCsat({
  isLoading,
  like,
  onSetLike,
  layoutType,
  label,
  dislikeCommentForm,
  showNewAppearance,
}: SiteCsatProps) {
  return (
    <div className={styles.siteCsatBlock} data-layout-type={layoutType}>
      <div className={styles.csatFormBlock}>
        {like === undefined || isLoading ? (
          <Typography.SansTitleM>{label}</Typography.SansTitleM>
        ) : (
          <div className={styles.reportSendBlock}>
            <CheckFilledSVG className={styles.checkIcon} />
            <Typography.SansTitleM>Спасибо за отзыв</Typography.SansTitleM>
          </div>
        )}
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <LikeDislikeBlock
            showNewAppearance={showNewAppearance}
            dislikeEnabled={dislikeCommentForm?.dislikeEnabled}
            like={like}
            onSetLike={onSetLike}
          />
        )}
        {like === false && !isLoading && dislikeCommentForm && dislikeCommentForm.open && (
          <Typography.SansBodyM className={styles.textSupport}>Поделитесь, что именно не так?</Typography.SansBodyM>
        )}
      </div>
      {like === false && !isLoading && dislikeCommentForm && dislikeCommentForm.open && (
        <ContentDislikeCsat
          classNameContentContainer={styles.classNameContentContainer}
          classNameChipsContainer={styles.classNameChipsContainer}
          onCheckChips={dislikeCommentForm.onCheckChips}
          onClickForm={dislikeCommentForm.onClickForm}
          loadingButton={dislikeCommentForm.loadingButton}
          onSubmit={dislikeCommentForm.onSubmit}
        />
      )}
    </div>
  );
}
