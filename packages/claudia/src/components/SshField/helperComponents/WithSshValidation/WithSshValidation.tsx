import { ReactNode, useMemo } from 'react';

import { AdaptiveTooltip } from '@cloud-ru/uikit-product-mobile-tooltip';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { ValidationState } from '../../types';
import { isTouchDevice } from '../../utils/isTouchDevice';
import { SshValidation } from '../SshValidation';
import styles from './styles.module.scss';

export type WithSshValidationProps = WithLayoutType<{
  children: ReactNode;
  sshValidation: ValidationState | null;
}>;

export function WithSshValidation({ sshValidation, layoutType, children }: WithSshValidationProps) {
  const isSshValidationError = useMemo(
    () => (sshValidation ? Object.values(sshValidation).some(item => item) : false),
    [sshValidation],
  );

  if (isTouchDevice(layoutType)) {
    return (
      <div className={styles.validationContainer}>
        <SshValidation sshValidation={sshValidation} layoutType={layoutType} />

        {children}
      </div>
    );
  }

  return (
    <AdaptiveTooltip
      placement='left-end'
      layoutType={layoutType}
      tip={<SshValidation sshValidation={sshValidation} layoutType={layoutType} />}
      open={isSshValidationError}
      offset={8}
    >
      {children}
    </AdaptiveTooltip>
  );
}
