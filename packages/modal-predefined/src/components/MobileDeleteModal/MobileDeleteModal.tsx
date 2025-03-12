import { ReactNode } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { MobileModalCustom, MobileModalCustomProps } from '@sbercloud/uikit-product-mobile-modal';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonOutline } from '@snack-uikit/button';

import { InputConfirm } from '../../helperComponents';
import { isDefined } from '../../helpers';
import { useTextFieldValidation } from './hooks';
import styles from './styles.module.scss';

export type MobileDeleteModalProps = Pick<MobileModalCustomProps, 'open' | 'onClose' | 'mode'> &
  WithSupportProps<{
    /** Всплывающая подсказка для заголовка */
    titleTooltip?: MobileModalCustom.HeaderProps['titleTooltip'];
    /** Тип удаляемого объекта. Отображается в заголовке модального окна */
    objectType?: string;
    /** Колбек нажатия кнопки удаления
     *  @param onClose колбэк для закрытия модального окна
     */
    onDelete(onClose: () => void): void;
    /** Состояние загрузки кнопки удаления */
    deleting?: boolean;
    /** Описание */
    description?: ReactNode;
    /** Текст для подтверждения удаления */
    confirmText?: string;
    /** Скрыть кнопку копирования для текста подтверждения */
    hideConfirmCopyButton?: boolean;
    /** Подзаголовок */
    subtitle?: ReactNode;
  }>;

export function MobileDeleteModal({
  confirmText,
  titleTooltip,
  hideConfirmCopyButton,
  description,
  objectType,
  onDelete,
  onClose,
  open,
  subtitle,
  deleting,
  ...restProps
}: MobileDeleteModalProps) {
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
    onDelete(handleClose);
  });

  return (
    <MobileModalCustom {...restProps} open={open} onClose={handleClose}>
      <MobileModalCustom.Header
        title={`${t('title')} ${objectType ?? ''}`}
        titleTooltip={titleTooltip}
        subtitle={subtitle}
      />

      <MobileModalCustom.Body content={<div className={styles.description}>{description}</div>} />

      <MobileModalCustom.Footer
        actions={
          <div className={styles.footer}>
            {withInputConfirmation && (
              <InputConfirm
                confirmText={confirmText}
                hideConfirmCopyButton={hideConfirmCopyButton}
                labelText={t('fieldLabel')}
                {...inputProps}
              />
            )}

            <div className={styles.footerActions}>
              <ButtonFilled
                label={t('delete')}
                loading={deleting}
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
