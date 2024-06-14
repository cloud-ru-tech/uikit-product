import { ReactNode } from 'react';

import { useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Modal, ModalProps } from '@snack-uikit/modal';

import { InputConfirm } from '../../helperComponents';
import { DictionaryPropertyAsFn, isDefined, textProvider, Texts } from '../../helpers';
import { useTextFieldValidation } from './hooks';
import styles from './styles.module.scss';

export type ConfirmDeleteModalProps = Pick<ModalProps, 'open' | 'titleTooltip' | 'onClose' | 'mode'> &
  WithSupportProps<{
    /** Тип удаляемого объекта. Отображается в заголовке модального окна */
    objectType?: string;
    /** Колбек нажатия кнопки удаления */
    onDelete(): void;
    /** Состояние загрузки кнопки удаления */
    deleting?: boolean;
    /** Описание */
    description?: ReactNode;
    /** Текст для подтверждения удаления */
    confirmText?: string;
    /** Скрыть кнопку копирования для текста подтверждения */
    hideConfirmCopyButton?: boolean;
  }>;

export function ConfirmDeleteModal({
  confirmText,
  hideConfirmCopyButton,
  description,
  objectType,
  onDelete,
  onClose,
  open,
  deleting,
  ...restProps
}: ConfirmDeleteModalProps) {
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
    onDelete();
    handleClose();
  });

  return (
    <Modal
      {...restProps}
      open={open}
      truncate={{
        title: 2,
      }}
      title={textProvider<DictionaryPropertyAsFn>(languageCode, Texts.Title)(objectType ?? '')}
      onClose={handleClose}
      additionalButton={{
        label: textProvider<string>(languageCode, Texts.Cancel),
        onClick: handleCancel,
      }}
      approveButton={{
        appearance: 'destructive',
        label: textProvider<string>(languageCode, Texts.Delete),
        loading: deleting,
        onClick: handleDelete,
      }}
      content={
        <div className={styles.description}>
          {description}

          {withInputConfirmation && (
            <InputConfirm confirmText={confirmText} hideConfirmCopyButton={hideConfirmCopyButton} {...inputProps} />
          )}
        </div>
      }
    />
  );
}
