import { ReactNode } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { AdaptiveTooltip } from '@sbercloud/uikit-product-mobile-tooltip';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { ValidationPassword } from '../../utils';
import { CheckItem } from '../CheckItem';
import styles from './styles.module.scss';

export type WithPasswordTooltipProps = WithLayoutType<{
  showTooltip?: boolean;
  children: ReactNode;
  passwordValidation: ValidationPassword;
}>;

export function WithPasswordTooltip({
  showTooltip,
  passwordValidation,
  layoutType,
  children,
}: WithPasswordTooltipProps) {
  const { t } = useLocale('FieldsPredefined');

  if (showTooltip) {
    return (
      <AdaptiveTooltip
        placement='top'
        layoutType={layoutType}
        tip={
          <div className={styles.validationItemsContainer}>
            <Typography.SansTitleS>{t('FieldAi.secret.passwordTooltip.title')}</Typography.SansTitleS>

            <CheckItem checked={passwordValidation.minLength} label={t('FieldAi.secret.passwordTooltip.minLength')} />
            <CheckItem
              checked={passwordValidation.hasCapitalLetter}
              label={t('FieldAi.secret.passwordTooltip.hasCapitalLetter')}
            />
            <CheckItem
              checked={passwordValidation.hasLowerCaseLetter}
              label={t('FieldAi.secret.passwordTooltip.hasLowerCaseLetter')}
            />
            <CheckItem checked={passwordValidation.hasNumber} label={t('FieldAi.secret.passwordTooltip.hasNumber')} />
            <CheckItem checked={passwordValidation.hasSymbol} label={t('FieldAi.secret.passwordTooltip.hasSymbol')} />
            <CheckItem checked={passwordValidation.noSpaces} label={t('FieldAi.secret.passwordTooltip.noSpaces')} />
          </div>
        }
      >
        {children}
      </AdaptiveTooltip>
    );
  }

  return children;
}
