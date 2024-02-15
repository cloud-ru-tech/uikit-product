import { forwardRef } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { FieldText } from '@snack-uikit/fields';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { textProvider, Texts } from '../../helpers';
import { CopyButton } from '../CopyButton';
import styles from './styles.module.scss';

export type InputConfirmProps = {
  targetName: string;
  value: string;
  error: string;
  onChange: (newValue: string) => void;
};

export const InputConfirm = forwardRef<HTMLInputElement, InputConfirmProps>(
  ({ targetName, value, error, onChange }, ref) => {
    const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

    return (
      <>
        <div className={styles.textField}>
          <Typography.SansLabelL className={styles.content}>
            {textProvider<string>(languageCode, Texts.FieldLabel)}
          </Typography.SansLabelL>

          <Typography.SansBodyM tag='h5'>
            <div className={styles.copyValue}>
              <TruncateString text={targetName} variant='middle' />
              <CopyButton valueToCopy={targetName} />
            </div>
          </Typography.SansBodyM>
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
      </>
    );
  },
);
