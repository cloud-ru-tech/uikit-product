import { useMemo } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { isTouchDevice as isTouchDeviceHelper } from '../../../../helpers';
import { ValidationPassword, ValidationPasswordKey } from '../../utils';
import { CheckItem } from '../CheckItem';
import styles from './styles.module.scss';

export type WithPasswordTooltipProps = WithLayoutType<{
  passwordValidation: ValidationPassword;
  animatedKey?: ValidationPasswordKey | null;
}>;

export function PasswordValidation({ passwordValidation, layoutType, animatedKey }: WithPasswordTooltipProps) {
  const { t } = useLocale('FieldsPredefined');

  const allCriteriaMet = useMemo(() => Object.values(passwordValidation).every(item => item), [passwordValidation]);
  const isTouchDevice = isTouchDeviceHelper(layoutType);

  if (isTouchDevice) {
    if (allCriteriaMet) {
      return (
        <div className={styles.validationItemsContainer} data-layout-type={layoutType}>
          <CheckItem
            checked={true}
            label={t('FieldAi.secret.passwordTooltip.titleSuccess')}
            layoutType={layoutType}
            shouldHide={false}
          />
        </div>
      );
    }
  }

  return (
    <div className={styles.validationItemsContainer} data-layout-type={layoutType}>
      <div className={styles.validationList}>
        <CheckItem
          checked={passwordValidation.minLength}
          label={t('FieldAi.secret.passwordTooltip.minLength')}
          layoutType={layoutType}
          shouldHide={isTouchDevice}
          animated={animatedKey === 'minLength'}
        />
        <CheckItem
          checked={passwordValidation.onlyLatin}
          label={t('FieldAi.secret.passwordTooltip.onlyLatin')}
          layoutType={layoutType}
          shouldHide={isTouchDevice}
          animated={animatedKey === 'onlyLatin'}
        />
        <CheckItem
          checked={passwordValidation.hasLetterCases}
          label={t('FieldAi.secret.passwordTooltip.hasLetterCases')}
          layoutType={layoutType}
          shouldHide={isTouchDevice}
          animated={animatedKey === 'hasLetterCases'}
        />
        <CheckItem
          checked={passwordValidation.hasNumber}
          label={t('FieldAi.secret.passwordTooltip.hasNumber')}
          layoutType={layoutType}
          shouldHide={isTouchDevice}
          animated={animatedKey === 'hasNumber'}
        />
        <CheckItem
          checked={passwordValidation.hasSymbol}
          label={t('FieldAi.secret.passwordTooltip.hasSymbol')}
          layoutType={layoutType}
          shouldHide={isTouchDevice}
          animated={animatedKey === 'hasSymbol'}
        />
        <CheckItem
          checked={passwordValidation.noSpaces}
          label={t('FieldAi.secret.passwordTooltip.noSpaces')}
          layoutType={layoutType}
          shouldHide={isTouchDevice}
          animated={animatedKey === 'noSpaces'}
        />
      </div>
    </div>
  );
}
