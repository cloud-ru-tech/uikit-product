import { forwardRef } from 'react';

import { AttachmentSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { FieldTextAreaProps } from '@sbercloud/uikit-product-mobile-fields';
import { ButtonFunction } from '@snack-uikit/button';
import { FileUpload } from '@snack-uikit/drop-zone';
import { Scroll } from '@snack-uikit/scroll';
import { Tooltip } from '@snack-uikit/tooltip';

import { FieldSubmitButton } from '../../helperComponents/FieldSubmitButton';
import { TextArea } from '../TextArea';
import styles from './styles.module.scss';

type MobileFieldAiProps = Omit<
  FieldTextAreaProps,
  'placeholder' | 'labelTooltip' | 'label' | 'required' | 'size' | 'spellCheck' | 'footer'
> & {
  onSubmit(): void;
  submitEnabled: boolean;
};

const MIN_ROWS = 1;
const MAX_ROWS = 6;

export const MobileFieldAi = forwardRef<HTMLTextAreaElement, MobileFieldAiProps>(
  ({ onSubmit, value, submitEnabled, ...props }, ref) => {
    const { t } = useLocale('FieldsPredefined');

    return (
      <div
        className={styles.mobileInputWrapper}
        style={{ '--max-rows': MAX_ROWS, '--min-rows': MIN_ROWS }}
        data-size='m'
      >
        <Scroll className={styles.scrollContainer} size='s' barHideStrategy='never'>
          <TextArea
            {...props}
            className={styles.textarea}
            ref={ref}
            value={value}
            minRows={MIN_ROWS}
            placeholder={t('FieldAi.regular.placeholder')}
            spellCheck={true}
          />
        </Scroll>

        <div className={styles.mobileSubmitButtonWrapper}>
          <Tooltip
            disableSpanWrapper
            tip={t('FieldChat.attachFileTooltip')}
            hoverDelayOpen={600}
            triggerClassName={styles.uploadTooltip}
          >
            <FileUpload mode='multiple' onFilesUpload={() => {}}>
              <ButtonFunction size={'s'} icon={<AttachmentSVG />} />
            </FileUpload>
          </Tooltip>
          <FieldSubmitButton
            showTooltip={false}
            className={styles.mobileSubmitButton}
            fullWidth={true}
            active={submitEnabled}
            handleClick={onSubmit}
            size='s'
          />
        </div>
      </div>
    );
  },
);
