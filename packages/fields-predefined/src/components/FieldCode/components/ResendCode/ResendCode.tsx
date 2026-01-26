import { UpdateSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';

import { formatSecondsAsMmSs } from './utils';

export type ResendCodeProps = {
  /** Колбек отправки нового кода */
  onResend: () => void;
  /** Количество секунд до следующего отправления кода */
  secondsToNextResend: number;
} & Pick<ButtonFunctionProps, 'size' | 'disabled'>;

export function ResendCode(props: ResendCodeProps) {
  const { onResend, secondsToNextResend, ...buttonProps } = props;
  const { t } = useLocale('FieldsPredefined');

  const isResendCodeWithVia = secondsToNextResend > 0;

  return (
    <ButtonFunction
      label={
        isResendCodeWithVia
          ? t('FieldCode.resendCodeButtons.resendCodeWithVia', {
              timer: formatSecondsAsMmSs(secondsToNextResend),
            })
          : t('FieldCode.resendCodeButtons.resendCode')
      }
      onClick={onResend}
      icon={<UpdateSVG />}
      iconPosition='before'
      disabled={isResendCodeWithVia ?? buttonProps.disabled}
      {...buttonProps}
    />
  );
}
