import cn from 'classnames';
import { forwardRef } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { FieldTextAreaProps } from '@cloud-ru/uikit-product-mobile-fields';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Scroll } from '@snack-uikit/scroll';

import { ChatStatusAnnouncementVmAgent } from '../../../ChatStatusAnnouncement';
import { FieldSubmitButton } from '../../components/FieldSubmitButton';
import { TextArea } from '../TextArea';
import styles from './styles.module.scss';

type MobileFieldAiProps = WithLayoutType<
  Omit<FieldTextAreaProps, 'placeholder' | 'labelTooltip' | 'label' | 'required' | 'size' | 'spellCheck' | 'footer'>
> & {
  onSubmit(): void;
  submitEnabled: boolean;
  onCancel(): void;
  vmIp?: string;
  vmName?: string;
};

const MIN_ROWS = 1;
const MAX_ROWS = 6;

export const MobileFieldAi = forwardRef<HTMLTextAreaElement, MobileFieldAiProps>(
  ({ onSubmit, value, submitEnabled, disabled, layoutType, onCancel, vmIp, vmName, className, ...props }, ref) => {
    const { t } = useLocale('Claudia');

    return (
      <div className={cn(styles.wrapper, className)}>
        <ChatStatusAnnouncementVmAgent
          className={styles.chatStatus}
          layoutType={layoutType}
          onActionClick={onCancel}
          ip={vmIp}
          vmName={vmName}
        />

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
              placeholder={t('VmAgentField.placeholder')}
              spellCheck={true}
            />
          </Scroll>

          <div className={styles.mobileSubmitButtonWrapper}>
            <FieldSubmitButton
              showTooltip={false}
              className={styles.mobileSubmitButton}
              fullWidth={true}
              active={submitEnabled}
              handleClick={onSubmit}
              disabled={disabled}
              size='s'
            />
          </div>
        </div>
      </div>
    );
  },
);
