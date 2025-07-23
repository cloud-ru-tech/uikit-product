import { KeyboardEventHandler, useMemo } from 'react';

import { AttachmentSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { AdaptiveFieldTextArea, FieldTextAreaProps } from '@sbercloud/uikit-product-mobile-fields';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { AttachmentSquareProps } from '@snack-uikit/attachment';
import { ButtonFunction } from '@snack-uikit/button';
import { FileUpload, FileUploadProps } from '@snack-uikit/drop-zone';
import { Tooltip } from '@snack-uikit/tooltip';

import { FieldSubmitButton } from '../../helperComponents/FieldSubmitButton';
import { TextAreaActionsFooter } from '../../helperComponents/TextAreaActionsFooter';
import { Attachments } from './components/Attachments';
import styles from './styles.module.scss';

export type FieldChatProps = WithLayoutType<
  Omit<
    FieldTextAreaProps,
    'placeholder' | 'hint' | 'labelTooltip' | 'label' | 'required' | 'size' | 'spellCheck' | 'footer'
  > & {
    /** Колбек действия при отправке */
    handleSubmit(value: string): void;
    attachment?: Pick<FileUploadProps, 'onFilesUpload' | 'accept'> & {
      /** Список загруженных файлов */
      files?: File[];
      /** Колбек действия при удалении прикрепленного файла */
      onFileDelete: AttachmentSquareProps['onDelete'];
    };
  }
>;

export function FieldChat({ handleSubmit: handleSubmitProp, value, layoutType, attachment, ...props }: FieldChatProps) {
  const { t } = useLocale('FieldsPredefined');

  const isMobile = layoutType === 'mobile';

  const files = useMemo<AttachmentSquareProps[]>(
    () =>
      attachment?.files?.map(file => ({
        file,
        onDelete: attachment?.onFileDelete,
      })) ?? [],
    [attachment?.files, attachment?.onFileDelete],
  );

  const isValueValid = (typeof value === 'string' && value.trim().length > 0) || files.length > 0;

  const handleSubmit = () => {
    if (isValueValid) {
      handleSubmitProp(value ?? '');
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
      return;
    }
  };

  return (
    <div className={styles.fieldChat} data-layout-type={layoutType}>
      {isMobile && <Attachments files={files} isMobile={isMobile} />}

      <AdaptiveFieldTextArea
        {...props}
        layoutType={layoutType}
        size={isMobile ? 'l' : 'm'}
        minRows={1}
        maxRows={4}
        placeholder={t('FieldChat.placeholder')}
        onKeyDown={handleKeyDown}
        footer={
          <TextAreaActionsFooter
            right={
              <>
                {attachment && (
                  <Tooltip
                    tip={t('FieldChat.attachFileTooltip')}
                    hoverDelayOpen={600}
                    triggerClassName={styles.uploadTooltip}
                  >
                    <FileUpload mode='multiple' onFilesUpload={attachment.onFilesUpload} accept={attachment.accept}>
                      <ButtonFunction size={isMobile ? 's' : 'xs'} icon={<AttachmentSVG />} />
                    </FileUpload>
                  </Tooltip>
                )}

                <FieldSubmitButton active={isValueValid} handleClick={handleSubmit} size={isMobile ? 's' : 'xs'} />
              </>
            }
          />
        }
      />

      {!isMobile && <Attachments files={files} />}
    </div>
  );
}
