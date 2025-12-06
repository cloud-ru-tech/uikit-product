import { ReactNode } from 'react';

import { AdaptiveTooltip } from '@sbercloud/uikit-product-mobile-tooltip';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { isTouchDevice } from '../../../../helpers';
import { ValidationPassword, ValidationPasswordKey } from '../../utils';
import { PasswordValidation } from '../PasswordValidation';
import styles from './styles.module.scss';

export type WithPasswordTooltipProps = WithLayoutType<{
  showValidation?: boolean;
  children: ReactNode;
  passwordValidation: ValidationPassword;
  animatedKey?: ValidationPasswordKey | null;
}>;

export function WithPasswordValidation({
  showValidation,
  passwordValidation,
  layoutType,
  children,
  animatedKey,
}: WithPasswordTooltipProps) {
  if (isTouchDevice(layoutType)) {
    if (showValidation) {
      return (
        <div className={styles.validationContainer}>
          <PasswordValidation
            passwordValidation={passwordValidation}
            layoutType={layoutType}
            animatedKey={animatedKey}
          />

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
        tip={
          <PasswordValidation
            passwordValidation={passwordValidation}
            layoutType={layoutType}
            animatedKey={animatedKey}
          />
        }
        offset={8}
      >
        {children}
      </AdaptiveTooltip>
    );
  }

  return children;
}
