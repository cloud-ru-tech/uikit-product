import { ReactNode } from 'react';

import { useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonOutline } from '@snack-uikit/button';

import { InputConfirm } from '../../helperComponents';
import { DictionaryPropertyAsFn, isDefined, textProvider, Texts } from '../../helpers';
import { MobileModalCustom, MobileModalCustomProps } from '../MobileModalCustom';
import { useTextFieldValidation } from './hooks';
import styles from './styles.module.scss';

export type MobileDeleteModalProps = Pick<MobileModalCustomProps, 'open' | 'onClose' | 'mode'> &
  WithSupportProps<{
    /** Всплывающая подсказка для заголовка */
    titleTooltip?: MobileModalCustom.HeaderProps['titleTooltip'];
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
  });

  return (
    <MobileModalCustom {...restProps} open={open} onClose={handleClose}>
      <MobileModalCustom.Header
        title={textProvider<DictionaryPropertyAsFn>(languageCode, Texts.Title)(objectType ?? '')}
        titleTooltip={titleTooltip}
        subtitle={subtitle}
      />

      <MobileModalCustom.Body content={<div className={styles.description}>{description}</div>} />

      <MobileModalCustom.Footer
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
                fullWidth
              />
              <ButtonOutline
                label={textProvider<string>(languageCode, Texts.Cancel)}
                onClick={handleCancel}
                appearance='neutral'
                size='m'
                fullWidth
              />
            </div>
          </div>
        }
      />
    </MobileModalCustom>
  );
}
