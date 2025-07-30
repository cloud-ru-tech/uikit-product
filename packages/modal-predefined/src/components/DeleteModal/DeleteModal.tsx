import { ReactNode } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonOutline } from '@snack-uikit/button';
import { ModalCustom, ModalCustomProps } from '@snack-uikit/modal';
import { TruncateString } from '@snack-uikit/truncate-string';

import { TEST_IDS } from '../../constants';
import { InputConfirm } from '../../helperComponents';
import { isDefined } from '../../helpers';
import { useTextFieldValidation } from './hooks';
import styles from './styles.module.scss';

export type DeleteModalProps = Pick<ModalCustomProps, 'open' | 'onClose' | 'mode'> &
  WithSupportProps<{
    /** Всплывающая подсказка для заголовка */
    titleTooltip?: ModalCustom.HeaderProps['titleTooltip'];
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
    /** Тип текста подтверждения */
    confirmTextVariant?: 'name' | 'text';
  }>;

export function DeleteModal({
  confirmText,
  titleTooltip,
  hideConfirmCopyButton,
  description,
  objectType,
  onDelete,
  onClose,
  open,
  deleting,
  subtitle,
  confirmTextVariant = 'name',
  ...restProps
}: DeleteModalProps) {
  const { t } = useLocale('ModalPredefined');

  const withInputConfirmation = isDefined(confirmText);

  const { reset, handleSubmit, ...inputProps } = useTextFieldValidation({
    target: confirmText,
    errorText: t(`invalidText.${confirmTextVariant}`),
  });

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
    <ModalCustom {...restProps} open={open} onClose={handleClose}>
      <ModalCustom.Header
        title={<TruncateString text={`${t('title')} ${objectType ?? ''}`} maxLines={2} />}
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
                labelText={t('fieldLabel')}
                placeholder={t(`enterText.${confirmTextVariant}`)}
                {...inputProps}
              />
            )}

            <div className={styles.footerActions}>
              <ButtonFilled
                label={t('delete')}
                loading={deleting}
                data-test-id={TEST_IDS.approveButton}
                onClick={handleDelete}
                size='m'
                appearance='destructive'
              />
              <ButtonOutline
                label={t('cancel')}
                onClick={handleCancel}
                data-test-id={TEST_IDS.closeButton}
                appearance='neutral'
                size='m'
              />
            </div>
          </div>
        }
      />
    </ModalCustom>
  );
}
