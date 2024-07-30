import { forwardRef } from 'react';

import { CopyButton } from '@sbercloud/uikit-product-copy-line';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { FieldText } from '@snack-uikit/fields';
import { TruncateString } from '@snack-uikit/truncate-string';

import { textProvider, Texts } from '../../helpers';
import styles from './styles.module.scss';

export type InputConfirmProps = {
  confirmText: string;
  hideConfirmCopyButton?: boolean;
  value: string;
  error: string;
  onChange: (newValue: string) => void;
};

export const InputConfirm = forwardRef<HTMLInputElement, InputConfirmProps>(
  ({ confirmText, value, error, onChange, hideConfirmCopyButton }, ref) => {
    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

    return (
      <div className={styles.wrapper}>
        <div className={styles.textFieldDescription}>
          <span className={styles.content}>{textProvider<string>(languageCode, Texts.FieldLabel)}</span>

          <div className={styles.copyValue}>
            <TruncateString text={confirmText} variant='middle' />

            {!hideConfirmCopyButton && <CopyButton valueToCopy={confirmText} />}
          </div>
        </div>

        <FieldText
          ref={ref}
          required
          size='m'
          placeholder={textProvider<string>(languageCode, Texts.EnterName)}
          value={value}
          onChange={onChange}
          hint={error}
          validationState={error ? 'error' : 'default'}
        />
      </div>
    );
  },
);
