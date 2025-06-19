import { ReactNode } from 'react';

import { AdaptiveTooltip } from '@sbercloud/uikit-product-mobile-tooltip';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { ValidationPassword } from '../../utils';
import { PasswordValidation } from '../PasswordValidation';
import styles from './styles.module.scss';

export type WithPasswordTooltipProps = WithLayoutType<{
  showValidation?: boolean;
  children: ReactNode;
  passwordValidation: ValidationPassword;
}>;

export function WithPasswordValidation({
  showValidation,
  passwordValidation,
  layoutType,
  children,
}: WithPasswordTooltipProps) {
  if (['mobile', 'tablet'].includes(layoutType)) {
    if (showValidation) {
      return (
        <div className={styles.validationContainer}>
          <PasswordValidation passwordValidation={passwordValidation} layoutType={layoutType} />

          {children}
        </div>
      );
    }

    return children;
  }

  if (showValidation) {
    return (
      <AdaptiveTooltip
        placement={'left-end'}
        layoutType={layoutType}
        tip={<PasswordValidation passwordValidation={passwordValidation} layoutType={layoutType} />}
        offset={8}
      >
        {children}
      </AdaptiveTooltip>
    );
  }

  return children;
}
