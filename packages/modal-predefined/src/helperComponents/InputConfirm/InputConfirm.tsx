import { forwardRef } from 'react';

import { CopyButton } from '@sbercloud/uikit-product-copy-line';
import { FieldText } from '@snack-uikit/fields';
import { TruncateString } from '@snack-uikit/truncate-string';

import styles from './styles.module.scss';

export type InputConfirmProps = {
  confirmText: string;
  hideConfirmCopyButton?: boolean;
  value: string;
  error: string;
  labelText: string;
  placeholder: string;
  onChange: (newValue: string) => void;
};

export const InputConfirm = forwardRef<HTMLInputElement, InputConfirmProps>(
  ({ confirmText, value, error, onChange, hideConfirmCopyButton, labelText, placeholder }, ref) => (
    <div className={styles.wrapper}>
      <div className={styles.textFieldDescription}>
        <span className={styles.content}>{labelText}</span>

        <div className={styles.copyValue}>
          <TruncateString text={confirmText} variant='middle' />

          {!hideConfirmCopyButton && <CopyButton valueToCopy={confirmText} />}
        </div>
      </div>

      <FieldText
        inputMode='text'
        ref={ref}
        required
        size='m'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        hint={error}
        validationState={error ? 'error' : 'default'}
      />
    </div>
  ),
);
