import { ReactNode } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { MobileModalCustom, MobileModalCustomProps } from '@sbercloud/uikit-product-mobile-modal';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonOutline } from '@snack-uikit/button';

import { InputConfirm } from '../../helperComponents';
import { isDefined } from '../../helpers';
import { useTextFieldValidation } from './hooks';
import styles from './styles.module.scss';

export type MobileRecallProps = Pick<MobileModalCustomProps, 'open' | 'onClose' | 'mode'> &
  WithSupportProps<{
    /** Всплывающая подсказка для заголовка */
    titleTooltip?: MobileModalCustom.HeaderProps['titleTooltip'];
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

export function MobileRecallModal({
  confirmText,
  titleTooltip,
  hideConfirmCopyButton,
  description,
  onRecall,
  onClose,
  open,
  subtitle,
  loading,
  ...restProps
}: MobileRecallProps) {
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
    <MobileModalCustom {...restProps} open={open} onClose={handleClose}>
      <MobileModalCustom.Header title={t('recallTitle')} titleTooltip={titleTooltip} subtitle={subtitle} />

      <MobileModalCustom.Body content={<div className={styles.description}>{description}</div>} />

      <MobileModalCustom.Footer
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
                fullWidth
              />
              <ButtonOutline label={t('cancel')} onClick={handleCancel} appearance='neutral' size='m' fullWidth />
            </div>
          </div>
        }
      />
    </MobileModalCustom>
  );
}
