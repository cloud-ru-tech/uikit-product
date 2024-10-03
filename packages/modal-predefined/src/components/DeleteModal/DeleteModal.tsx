import { ReactNode } from 'react';

import { useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonOutline } from '@snack-uikit/button';
import { ModalCustom, ModalCustomProps } from '@snack-uikit/modal';
import { TruncateString } from '@snack-uikit/truncate-string';

import { InputConfirm } from '../../helperComponents';
import { DictionaryPropertyAsFn, isDefined, textProvider, Texts } from '../../helpers';
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
  ...restProps
}: DeleteModalProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

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
    <ModalCustom {...restProps} open={open} onClose={handleClose}>
      <ModalCustom.Header
        title={
          <TruncateString
            text={textProvider<DictionaryPropertyAsFn>(languageCode, Texts.Title)(objectType ?? '')}
            maxLines={2}
          />
        }
        subtitle={subtitle}
        titleTooltip={titleTooltip}
      />

      {description && <ModalCustom.Body content={<div className={styles.description}>{description}</div>} />}

      <ModalCustom.Footer
        actions={
          <div className={styles.footer}>
            {withInputConfirmation && (
              <InputConfirm confirmText={confirmText} hideConfirmCopyButton={hideConfirmCopyButton} {...inputProps} />
            )}

            <div className={styles.footerActions}>
              <ButtonFilled
                label={textProvider<string>(languageCode, Texts.Delete)}
                loading={deleting}
                onClick={handleDelete}
                size='m'
                appearance='destructive'
              />
              <ButtonOutline
                label={textProvider<string>(languageCode, Texts.Cancel)}
                onClick={handleCancel}
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
