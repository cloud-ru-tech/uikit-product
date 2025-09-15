import cn from 'classnames';
import { forwardRef, KeyboardEventHandler, useMemo, useState } from 'react';

import { EyeClosedSVG, EyeSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import {
  AdaptiveFieldTextArea,
  FieldTextAreaProps,
  getAdaptiveFieldProps,
} from '@sbercloud/uikit-product-mobile-fields';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { ButtonFunction, ButtonOutline } from '@snack-uikit/button';
import { Tooltip } from '@snack-uikit/tooltip';

import { FieldSubmitButton } from '../../helperComponents/FieldSubmitButton';
import { TextAreaActionsFooter } from '../../helperComponents/TextAreaActionsFooter';
import { isTouchDevice as isTouchDeviceHelper } from '../../helpers';
import { AIDisclaimer } from '../AIDisclaimer/AIDisclaimer';
import { MobileFieldAi } from './components/MobileFieldAi';
import { WithPasswordValidation } from './components/WithPasswordValidation';
import styles from './styles.module.scss';
import { getValidationPassword } from './utils';

export type FieldAiProps = WithLayoutType<
  Omit<FieldTextAreaProps, 'placeholder' | 'labelTooltip' | 'label' | 'required' | 'size' | 'spellCheck' | 'footer'> & {
    /** Режим ввода sensitive данных (пароля, API ключей, токенов, etc) */
    secure?: boolean | 'password';
    /** Колбек действия при отправке */
    onSubmit(value: string): void;
    /** Действие при клике по кнопке сброса контекста */
    onResetContextClick?(): void;
  }
>;

export const FieldAi = forwardRef<HTMLTextAreaElement, FieldAiProps>(
  ({ secure = false, onSubmit: handleSubmitProp, value, onResetContextClick, disabled, className, ...props }, ref) => {
    const { layoutType, validationState } = props;
    const { t } = useLocale('FieldsPredefined');
    const isTouchDevice = isTouchDeviceHelper(layoutType);

    const [isValueHidden, setIsValueHidden] = useState<boolean>(true);

    const isValueValid = typeof value === 'string' && value.trim().length > 0;
    const isPasswordMode = secure === 'password';

    const passwordValidation = useMemo(() => getValidationPassword(value), [value]);
    const isPasswordValid = isPasswordMode ? Object.values(passwordValidation).every(Boolean) : true;
    const showPasswordError = !isPasswordValid && secure && value;

    const handleSubmit = () => {
      if (isValueValid && isPasswordValid) {
        handleSubmitProp(value);
      }
    };

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
      if (isTouchDevice) {
        return;
      }

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();

        if (!disabled) {
          handleSubmit();
        }

        return;
      }
    };

    if (isTouchDevice && !secure) {
      return (
        <MobileFieldAi
          {...props}
          {...getAdaptiveFieldProps(props)}
          onSubmit={handleSubmit}
          submitEnabled={isValueValid && !disabled}
          ref={ref}
          value={value}
        />
      );
    }

    return (
      <div className={cn(styles.wrapper, className)}>
        <WithPasswordValidation
          showValidation={isPasswordMode}
          passwordValidation={passwordValidation}
          layoutType={layoutType}
        >
          <AdaptiveFieldTextArea
            {...props}
            ref={ref}
            value={value}
            size='m'
            minRows={secure ? 1 : 2}
            maxRows={secure ? 1 : 4}
            placeholder={secure ? t('FieldAi.secret.placeholder') : t('FieldAi.regular.placeholder')}
            className={secure && isValueHidden ? styles.secured : undefined}
            onKeyDown={handleKeyDown}
            spellCheck={!secure}
            validationState={showPasswordError ? 'error' : validationState}
            footer={
              <TextAreaActionsFooter
                left={
                  secure && (
                    <ButtonFunction
                      size='xs'
                      icon={isValueHidden ? <EyeSVG /> : <EyeClosedSVG />}
                      onClick={() => setIsValueHidden(prev => !prev)}
                    />
                  )
                }
                right={
                  <>
                    {secure && onResetContextClick && (
                      <Tooltip tip={t('FieldAi.resetContext.tooltip')} hoverDelayOpen={600}>
                        <ButtonOutline
                          size='xs'
                          label={t('FieldAi.resetContext.label')}
                          onClick={onResetContextClick}
                          appearance='destructive'
                        />
                      </Tooltip>
                    )}
                    <FieldSubmitButton
                      showTooltip={!isTouchDevice}
                      className={isTouchDevice ? styles.mobileSubmitButton : undefined}
                      active={isValueValid && !disabled && isPasswordValid}
                      handleClick={handleSubmit}
                      size={isTouchDevice ? 's' : 'xs'}
                    />
                  </>
                }
              />
            }
          />
        </WithPasswordValidation>

        {!isPasswordMode && <AIDisclaimer layoutType={layoutType} />}
      </div>
    );
  },
);
