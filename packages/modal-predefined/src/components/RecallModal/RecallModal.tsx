import { ReactNode } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonOutline } from '@snack-uikit/button';
import { ModalCustom, ModalCustomProps } from '@snack-uikit/modal';
import { TruncateString } from '@snack-uikit/truncate-string';

import { InputConfirm } from '../../helperComponents';
import { isDefined } from '../../helpers';
import { useTextFieldValidation } from './hooks';
import styles from './styles.module.scss';

export type RecallModalProps = Pick<ModalCustomProps, 'open' | 'onClose' | 'mode'> &
  WithSupportProps<{
    /** Всплывающая подсказка для заголовка */
    titleTooltip?: ModalCustom.HeaderProps['titleTooltip'];
    /** Колбек нажатия кнопки отзыва
     *  @param onClose колбэк для закрытия модального окна
     */
    onRecall(onClose: () => void): void;
    /** Состояние загрузки кнопки отзыва */
    loading?: boolean;
    /** Описание */
    description?: ReactNode;
    /** Текст для подтверждения отзыва */
    confirmText?: string;
    /** Скрыть кнопку копирования для текста подтверждения */
    hideConfirmCopyButton?: boolean;
    /** Подзаголовок */
    subtitle?: ReactNode;
  }>;

export function RecallModal({
  confirmText,
  titleTooltip,
  hideConfirmCopyButton,
  description,
  onRecall,
  onClose,
  open,
  loading,
  subtitle,
  ...restProps
}: RecallModalProps) {
  const { t } = useLocale('ModalPredefined');

  const withInputConfirmation = isDefined(confirmText);

  const { reset, handleSubmit, ...inputProps } = useTextFieldValidation(confirmText);

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleCancel = () => {
    onClose();
    reset();
  };

  const handleDelete = handleSubmit(() => {
    onRecall(handleClose);
  });

  return (
    <ModalCustom {...restProps} open={open} onClose={handleClose}>
      <ModalCustom.Header
        title={<TruncateString text={t('recallTitle')} maxLines={2} />}
        subtitle={subtitle}
        titleTooltip={titleTooltip}
      />

      {description && <ModalCustom.Body content={<div className={styles.description}>{description}</div>} />}

      <ModalCustom.Footer
        actions={
          <div className={styles.footer}>
            {withInputConfirmation && (
              <InputConfirm
                confirmText={confirmText}
                hideConfirmCopyButton={hideConfirmCopyButton}
                labelText={t('recallFieldLabel')}
                placeholder={t(`enterText.name`)}
                {...inputProps}
              />
            )}

            <div className={styles.footerActions}>
              <ButtonFilled
                label={t('recall')}
                loading={loading}
                onClick={handleDelete}
                size='m'
                appearance='destructive'
              />
              <ButtonOutline label={t('cancel')} onClick={handleCancel} appearance='neutral' size='m' />
            </div>
          </div>
        }
      />
    </ModalCustom>
  );
}
