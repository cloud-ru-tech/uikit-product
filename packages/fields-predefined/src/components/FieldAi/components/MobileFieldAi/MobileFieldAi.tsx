import { forwardRef } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { FieldTextAreaProps } from '@snack-uikit/fields';
import { Scroll } from '@snack-uikit/scroll';

import { FieldSubmitButton } from '../../../../helperComponents/FieldSubmitButton';
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
            placeholder={t('FieldAi.regular.shortPlaceholder')}
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
            size='s'
          />
        </div>
      </div>
    );
  },
);
