import cn from 'classnames';
import { forwardRef, KeyboardEventHandler } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import {
  AdaptiveFieldTextArea,
  FieldTextAreaProps,
  getAdaptiveFieldProps,
} from '@cloud-ru/uikit-product-mobile-fields';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { ChatStatusAnnouncementVmAgent } from '../ChatStatusAnnouncement/components';
import { FieldSubmitButton } from './components/FieldSubmitButton';
import { MobileFieldAi } from './components/MobileFieldAi';
import { TextAreaActionsFooter } from './components/TextAreaActionsFooter';
import styles from './styles.module.scss';
import { isTouchDevice as isTouchDeviceHelper } from './utils/isTouchDevice';

export type VmAgentFieldProps = WithLayoutType<
  Omit<
    FieldTextAreaProps,
    'placeholder' | 'labelTooltip' | 'label' | 'required' | 'size' | 'spellCheck' | 'footer' | 'validationState'
  > & {
    /** Колбек действия при отправке */
    onSubmit(value: string): void;
    /** Колбек отмены действия */
    onCancel(): void;
    /** IP виртуальной машины */
    vmIp?: string;
    /** Имя виртуальной машины */
    vmName?: string;
  }
>;

export const VmAgentField = forwardRef<HTMLTextAreaElement, VmAgentFieldProps>(
  ({ onSubmit: handleSubmitProp, onCancel, value, disabled, className, vmName, vmIp, ...props }, ref) => {
    const { layoutType } = props;
    const { t } = useLocale('Claudia');
    const isTouchDevice = isTouchDeviceHelper(layoutType);
    const isValueValid = typeof value === 'string' && value.trim().length > 0;

    const handleSubmit = () => {
      if (isValueValid) {
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

    if (isTouchDevice) {
      return (
        <>
          <MobileFieldAi
            {...props}
            {...getAdaptiveFieldProps(props)}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            vmIp={vmIp}
            vmName={vmName}
            submitEnabled={isValueValid && !disabled}
            ref={ref}
            value={value}
          />
        </>
      );
    }

    return (
      <div className={cn(styles.wrapper, className)}>
        <ChatStatusAnnouncementVmAgent
          className={styles.chatStatus}
          layoutType={layoutType}
          onActionClick={onCancel}
          ip={vmIp}
          vmName={vmName}
        />
        <AdaptiveFieldTextArea
          {...props}
          ref={ref}
          value={value}
          size='m'
          disabled={disabled}
          minRows={2}
          maxRows={4}
          placeholder={t('VmAgentField.placeholder')}
          onKeyDown={handleKeyDown}
          hint={props.hint}
          footer={
            <TextAreaActionsFooter
              right={
                <FieldSubmitButton
                  disabled={!value || disabled}
                  showTooltip={!isTouchDevice}
                  className={isTouchDevice ? styles.mobileSubmitButton : undefined}
                  active={isValueValid && !disabled}
                  handleClick={handleSubmit}
                  size={isTouchDevice ? 's' : 'xs'}
                />
              }
            />
          }
        />
      </div>
    );
  },
);
