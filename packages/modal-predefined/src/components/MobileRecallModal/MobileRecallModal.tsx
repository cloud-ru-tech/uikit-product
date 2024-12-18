import { ReactNode } from 'react';

import { MobileModalCustom, MobileModalCustomProps } from '@sbercloud/uikit-product-mobile-modal';
import { useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonOutline } from '@snack-uikit/button';

import { InputConfirm } from '../../helperComponents';
import { isDefined, textProvider, Texts } from '../../helpers';
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
    onRecall(handleClose);
  });

  return (
    <MobileModalCustom {...restProps} open={open} onClose={handleClose}>
      <MobileModalCustom.Header
        title={textProvider<string>(languageCode, Texts.RecallTitle)}
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
                labelText={Texts.RecallFieldLabel}
                {...inputProps}
              />
            )}

            <div className={styles.footerActions}>
              <ButtonFilled
                label={textProvider<string>(languageCode, Texts.Recall)}
                loading={loading}
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
