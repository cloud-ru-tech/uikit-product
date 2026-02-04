import cn from 'classnames';
import { DragEvent, forwardRef, KeyboardEventHandler, useState } from 'react';

import { AttachmentSVG, EyeClosedSVG, EyeSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import {
  AdaptiveFieldTextArea,
  FieldTextAreaProps,
  getAdaptiveFieldProps,
} from '@cloud-ru/uikit-product-mobile-fields';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { DropZone, FileUpload } from '@snack-uikit/drop-zone';
import { Tooltip } from '@snack-uikit/tooltip';

import { ChatStatusAnnouncementSsh } from '../ChatStatusAnnouncement/components';
import { MobileFieldAi } from './components/MobileFieldAi';
import { DropZoneContent } from './helperComponents/DropZoneContent';
import { FieldSubmitButton } from './helperComponents/FieldSubmitButton';
import { TextAreaActionsFooter } from './helperComponents/TextAreaActionsFooter';
import { WithSshValidation } from './helperComponents/WithSshValidation';
import styles from './styles.module.scss';
import { ValidationState } from './types';
import { isTouchDevice as isTouchDeviceHelper } from './utils/isTouchDevice';
import { readFileContent } from './utils/readFileContent';
import { validateFileErrors, validateSshKeyErrors } from './utils/validateSSHKey';

export type SshFieldProps = WithLayoutType<
  Omit<FieldTextAreaProps, 'placeholder' | 'labelTooltip' | 'label' | 'required' | 'size' | 'spellCheck' | 'footer'> & {
    /** Колбек действия при отправке */
    onSubmit(value: string): void;
    /** Колбек отмены действия */
    onCancel(): void;
  }
>;

export const SshField = forwardRef<HTMLTextAreaElement, SshFieldProps>(
  ({ onSubmit: handleSubmitProp, onCancel, value, disabled, className, ...props }, ref) => {
    const { layoutType, validationState, onChange } = props;
    const { t } = useLocale('Claudia');
    const isTouchDevice = isTouchDeviceHelper(layoutType);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isValueHidden, setIsValueHidden] = useState<boolean>(true);
    const [sshValidation, setSshValidation] = useState<ValidationState | null>(null);

    const isSshValid = !sshValidation || Object.values(sshValidation).every(value => !value);
    const isValueValid = isSshValid && typeof value === 'string' && value.trim().length > 0;

    const handleChange = (newValue: string) => {
      if (sshValidation) {
        setSshValidation(null);
      }

      if (!onChange) return;

      onChange(newValue);

      if (newValue) {
        const sshValidationState = validateSshKeyErrors(newValue);
        setSshValidation(sshValidationState);
      }
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragOver(false);
    };

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

    const onFileUpload = async (file: File) => {
      try {
        setIsLoading(true);
        setSshValidation(null);

        const fileValidationErrorState = validateFileErrors(file);

        if (fileValidationErrorState.fileType) {
          setSshValidation(fileValidationErrorState);
          return;
        }

        const { error, fileContent } = await readFileContent(file);

        if (error || typeof fileContent !== 'string') {
          setSshValidation({ ...fileValidationErrorState, readError: true });
          return;
        }

        const sshValidationState = validateSshKeyErrors(fileContent);
        setSshValidation({ ...fileValidationErrorState, ...sshValidationState });

        if (!onChange) return;

        onChange(fileContent);
      } finally {
        setIsLoading(false);
        setIsDragOver(false);
      }
    };

    if (isTouchDevice) {
      return (
        <WithSshValidation layoutType={layoutType} sshValidation={sshValidation}>
          <MobileFieldAi
            {...props}
            onChange={handleChange}
            onFileUpload={onFileUpload}
            {...getAdaptiveFieldProps(props)}
            onSubmit={handleSubmit}
            submitEnabled={isValueValid && !disabled}
            ref={ref}
            value={value}
          />
        </WithSshValidation>
      );
    }

    return (
      <div className={cn(styles.wrapper, className)} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
        <WithSshValidation layoutType={layoutType} sshValidation={sshValidation}>
          <ChatStatusAnnouncementSsh className={styles.chatStatus} layoutType={layoutType} onActionClick={onCancel} />
          {isDragOver ? (
            <DropZone
              description={<DropZoneContent />}
              className={styles.dropZone}
              mode='single'
              onFilesUpload={(files: File[]) => onFileUpload(files[0])}
            />
          ) : (
            <AdaptiveFieldTextArea
              {...props}
              ref={ref}
              value={value}
              onChange={handleChange}
              size='m'
              disabled={isLoading}
              minRows={2}
              maxRows={4}
              placeholder={t('SshField.placeholder')}
              className={isValueHidden ? styles.secured : undefined}
              onKeyDown={handleKeyDown}
              validationState={isSshValid ? validationState : 'error'}
              hint={props.hint}
              footer={
                <TextAreaActionsFooter
                  left={
                    <ButtonFunction
                      size='xs'
                      icon={isValueHidden ? <EyeSVG /> : <EyeClosedSVG />}
                      onClick={() => setIsValueHidden(prev => !prev)}
                      disabled={isLoading}
                    />
                  }
                  right={
                    <>
                      <Tooltip
                        tip={t('SshField.attachFileTooltip')}
                        hoverDelayOpen={600}
                        triggerClassName={styles.uploadTooltip}
                        open={isTouchDevice ? false : undefined}
                      >
                        <FileUpload mode='single' onFilesUpload={(files: File[]) => onFileUpload(files[0])}>
                          <ButtonFunction
                            disabled={isLoading}
                            size={isTouchDevice ? 's' : 'xs'}
                            icon={<AttachmentSVG />}
                          />
                        </FileUpload>
                      </Tooltip>
                      <FieldSubmitButton
                        disabled={isLoading}
                        showTooltip={!isTouchDevice}
                        className={isTouchDevice ? styles.mobileSubmitButton : undefined}
                        active={isValueValid && !disabled}
                        handleClick={handleSubmit}
                        size={isTouchDevice ? 's' : 'xs'}
                      />
                    </>
                  }
                />
              }
            />
          )}
        </WithSshValidation>
      </div>
    );
  },
);
