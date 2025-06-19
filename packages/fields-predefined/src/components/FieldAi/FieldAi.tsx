import { forwardRef, KeyboardEventHandler, MouseEvent, useMemo, useState } from 'react';

import { EyeClosedSVG, EyeSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { ButtonFunction, ButtonOutline } from '@snack-uikit/button';
import { FieldTextArea, FieldTextAreaProps } from '@snack-uikit/fields';
import { Link } from '@snack-uikit/link';
import { QuestionTooltip, Tooltip } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';

import { FieldSubmitButton } from '../../helperComponents/FieldSubmitButton';
import { TextAreaActionsFooter } from '../../helperComponents/TextAreaActionsFooter';
import { WithPasswordTooltip } from './components/WithPasswordTooltip';
import styles from './styles.module.scss';
import { getValidationPassword } from './utils';

export type FieldAiProps = WithLayoutType<
  Omit<FieldTextAreaProps, 'placeholder' | 'labelTooltip' | 'label' | 'required' | 'size' | 'spellCheck' | 'footer'> & {
    /** Режим ввода sensitive данных (пароля, API ключей, токенов, etc) */
    secure?: boolean | 'password';
    /** Колбек действия при отправке */
    handleSubmit(value: string): void;
    /** Ссылка на чат поддержки */
    supportUrl?: string;
    /** Действие при клике по ссылке на чат поддержки */
    handleSupportUrlClick?(e: MouseEvent): void;
    /** Действие при клике по кнопке сброса контекста */
    handleResetContextClick?(): void;
  }
>;

export const FieldAi = forwardRef<HTMLTextAreaElement, FieldAiProps>(
  (
    {
      secure = false,
      handleSubmit: handleSubmitProp,
      value,
      supportUrl,
      handleSupportUrlClick,
      handleResetContextClick,
      layoutType,
      disabled,
      ...props
    },
    ref,
  ) => {
    const { t } = useLocale('FieldsPredefined');

    const [isValueHidden, setIsValueHidden] = useState<boolean>(true);

    const isValueValid = typeof value === 'string' && value.trim().length > 0;
    const isPasswordMode = secure === 'password';

    const passwordValidation = useMemo(() => getValidationPassword(value), [value]);

    const handleSubmit = () => {
      const isPasswordValid = isPasswordMode ? Object.values(passwordValidation).every(Boolean) : true;

      if (isValueValid && isPasswordValid) {
        handleSubmitProp(value);
      }
    };

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();

        if (!disabled) {
          handleSubmit();
        }

        return;
      }
    };

    return (
      <div className={styles.wrapper}>
        <WithPasswordTooltip
          showTooltip={isPasswordMode}
          passwordValidation={passwordValidation}
          layoutType={layoutType}
        >
          <FieldTextArea
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
                    {secure && handleResetContextClick && (
                      <Tooltip tip={t('FieldAi.resetContext.tooltip')} hoverDelayOpen={600}>
                        <ButtonOutline
                          size='xs'
                          label={t('FieldAi.resetContext.label')}
                          onClick={handleResetContextClick}
                          appearance='destructive'
                        />
                      </Tooltip>
                    )}
                    <FieldSubmitButton active={isValueValid && !disabled} handleClick={handleSubmit} />
                  </>
                }
              />
            }
          />
        </WithPasswordTooltip>
        <div className={styles.footerText}>
          <span className={styles.hintText} data-layout-type={layoutType}>
            {t('FieldAi.hint.text')}
          </span>

          {supportUrl && (
            <QuestionTooltip
              size='xs'
              tooltipClassname={styles.tooltip}
              tip={
                <>
                  <Typography.SansBodyS>{t('FieldAi.hint.tooltip')}</Typography.SansBodyS>
                  <Link
                    text={t('FieldAi.hint.tooltipLink')}
                    href={supportUrl}
                    onClick={handleSupportUrlClick}
                    appearance='invert-neutral'
                    textMode='accent'
                  />
                </>
              }
            />
          )}
        </div>
      </div>
    );
  },
);
