import cn from 'classnames';
import { ReactNode } from 'react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';
import { CrossSVG } from '@snack-uikit/icons';
import { Spinner } from '@snack-uikit/loaders';
import { Typography } from '@snack-uikit/typography';

import { TextFieldWithAccordionMessage } from './components/TextFieldWithAccordionMessage';
import styles from './styles.module.scss';
import { Grade } from './types';

export type RateFormProps = {
  /** Массив доступных оценок */
  grades: Grade[];
  /** Текущая выбранная оценка */
  selectedGrade?: Grade | null;
  /** Заголовок формы (показывается когда оценка не выбрана) */
  title?: string;
  /** Текст "Вы поставили" */
  ratedLabel?: string;
  /** Подзаголовок после выбора оценки */
  ratedSubtitle?: string;
  /** Комментарий пользователя */
  comment?: string;
  /** Состояние загрузки */
  isLoading?: boolean;
  /** Callback при клике на оценку */
  onGradeClick?: (grade: Grade) => void;
  /** Callback при закрытии формы */
  onClose?: () => void;
  /** Callback при изменении комментария */
  onCommentChange?: (comment: string) => void;
  /** Callback при отправке комментария */
  onCommentSubmit?: (comment: string) => void;
  /** Плейсхолдер для поля комментария */
  commentPlaceholder?: string;
  /** Показывать ли кнопку закрытия */
  showCloseButton?: boolean;
  /** Дополнительный className */
  className?: string;
  /** Является ли устройство тач-девайсом */
  isTouchDevice?: boolean;
  /** Текст тултипа для кнопки отправки */
  submitTooltipText?: string;
  /** Render prop для кастомного отображения текстового поля */
  renderTextField?: (props: {
    comment?: string;
    grade: Grade;
    placeholder?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
  }) => ReactNode;
};

export function RateForm({
  grades,
  selectedGrade,
  title,
  ratedLabel,
  ratedSubtitle,
  comment,
  isLoading = false,
  onGradeClick,
  onClose,
  onCommentChange,
  onCommentSubmit,
  commentPlaceholder,
  showCloseButton = true,
  className,
  isTouchDevice = false,
  submitTooltipText,
  renderTextField,
}: RateFormProps) {
  if (isLoading) {
    return (
      <div className={cn(styles.feedbackFormLoading, className)} data-loading>
        <Spinner size='s' />
      </div>
    );
  }

  return (
    <div className={cn(styles.feedbackForm, className)} data-touch={isTouchDevice || undefined}>
      {selectedGrade ? (
        <div className={styles.ratingContainer}>
          <div className={styles.ratingTitle}>
            {ratedLabel && <Typography.SansLabelL>{ratedLabel}</Typography.SansLabelL>}
            <Typography.SansTitleL className={styles.ratingIcon}>{selectedGrade.icon}</Typography.SansTitleL>
          </div>

          {ratedSubtitle && (
            <Typography.SansBodyM className={styles.ratingSubtitle}>{ratedSubtitle}</Typography.SansBodyM>
          )}
        </div>
      ) : (
        title && <Typography.SansLabelL className={styles.feedbackFormTitle}>{title}</Typography.SansLabelL>
      )}

      {!selectedGrade && (
        <div className={styles.gradeBlock}>
          {grades.map(grade => (
            <div key={grade.id} className={styles.grade} onClick={() => onGradeClick?.(grade)} role='presentation'>
              <Typography.SansHeadlineL className={styles.gradeIcon}>{grade.icon}</Typography.SansHeadlineL>
              <Typography.LightLabelS className={styles.description}>{grade.description}</Typography.LightLabelS>
            </div>
          ))}
        </div>
      )}

      {selectedGrade &&
        (renderTextField ? (
          renderTextField({
            comment,
            grade: selectedGrade,
            placeholder: commentPlaceholder,
            onChange: onCommentChange,
            onSubmit: onCommentSubmit,
          })
        ) : (
          <TextFieldWithAccordionMessage
            comment={comment}
            placeholder={commentPlaceholder}
            onChange={onCommentChange}
            onSubmit={onCommentSubmit}
            isTouchDevice={isTouchDevice}
            submitTooltipText={submitTooltipText}
          />
        ))}

      {showCloseButton && selectedGrade && (
        <CrossSVG className={styles.closeIcon} size={24} color={themeVars.sys.neutral.textSupport} onClick={onClose} />
      )}
    </div>
  );
}
