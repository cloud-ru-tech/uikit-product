import cn from 'classnames';
import { DragEvent, forwardRef, KeyboardEventHandler, useState } from 'react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';
import { AttachmentSVG, EyeClosedSVG, EyeSVG, PasswordLockSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import {
  AdaptiveFieldTextArea,
  FieldTextAreaProps,
  getAdaptiveFieldProps,
} from '@sbercloud/uikit-product-mobile-fields';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { DropZone, FileUpload } from '@snack-uikit/drop-zone';
import { Tooltip } from '@snack-uikit/tooltip';

import { ChatStatusAnnouncement } from '../ChatStatusAnnouncement';
import { MobileFieldAi } from './components/MobileFieldAi';
import { DropZoneContent } from './helperComponents/DropZoneContent';
import { FieldSubmitButton } from './helperComponents/FieldSubmitButton';
import { TextAreaActionsFooter } from './helperComponents/TextAreaActionsFooter';
import styles from './styles.module.scss';
import { FileErrorType, getFileErrorType } from './utils/handleFileError';
import { isTouchDevice as isTouchDeviceHelper } from './utils/isTouchDevice';
import { readFileContent } from './utils/readFileContent';
import { validateFileSize, validateFileType, validateSSHKeyContent } from './utils/validateSSHKey';

export type SshFieldProps = WithLayoutType<
  Omit<FieldTextAreaProps, 'placeholder' | 'labelTooltip' | 'label' | 'required' | 'size' | 'spellCheck' | 'footer'> & {
    /** Колбек действия при отправке */
    onSubmit(value: string): void;
  }
>;

export const SshField = forwardRef<HTMLTextAreaElement, SshFieldProps>(
  ({ onSubmit: handleSubmitProp, value, disabled, className, ...props }, ref) => {
    const { layoutType, validationState, onChange } = props;
    const { t } = useLocale('Claudia');
    const isTouchDevice = isTouchDeviceHelper(layoutType);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isValueHidden, setIsValueHidden] = useState<boolean>(true);
    const [fileErrorType, setFileErrorType] = useState<FileErrorType | null>(null);

    const isValueValid = typeof value === 'string' && value.trim().length > 0;
    const showFileError = Boolean(fileErrorType);

    const getErrorMessage = (errorType: FileErrorType): string => {
      switch (errorType) {
        case 'EMPTY_FILE':
          return t('SshField.errors.emptyFile');
        case 'BINARY_DATA':
          return t('SshField.errors.binaryData');
        case 'INVALID_SSH_KEY':
          return t('SshField.errors.invalidSSHKey');
        case 'INVALID_EXTENSION':
        case 'INVALID_MIME_TYPE':
        case 'INVALID_FILE_TYPE':
          return t('SshField.errors.invalidFileExtension');
        case 'FILE_TOO_LARGE':
          return t('SshField.errors.fileTooLarge');
        case 'READ_ERROR':
          return t('SshField.errors.readError');
        case 'UNKNOWN_ERROR':
        default:
          return t('SshField.errors.unknownError');
      }
    };

    const handleChange = (newValue: string) => {
      if (fileErrorType) {
        setFileErrorType(null);
      }
      if (onChange) {
        onChange(newValue);
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
        setFileErrorType(null);
        validateFileType(file);
        validateFileSize(file);

        const fileContent = await readFileContent(file);

        validateSSHKeyContent(fileContent);

        if (onChange) {
          onChange(fileContent);
        }
      } catch (err) {
        const errorType = getFileErrorType(err);
        setFileErrorType(errorType);
      } finally {
        setIsLoading(false);
        setIsDragOver(false);
      }
    };

    if (isTouchDevice) {
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
      <div className={cn(styles.wrapper, className)} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
        <ChatStatusAnnouncement
          className={styles.chatStatus}
          layoutType={layoutType}
          icon={<PasswordLockSVG size={16} color={themeVars.sys.neutral.textSupport} />}
          content={t('SshField.chatStatusAnnouncement.content')}
          actionLabel={t('SshField.chatStatusAnnouncement.cancel')}
          onActionClick={() => {}}
        />
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
            validationState={showFileError ? 'error' : validationState}
            hint={showFileError && fileErrorType ? getErrorMessage(fileErrorType) : props.hint}
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
      </div>
    );
  },
);
