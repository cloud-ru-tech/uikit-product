import { formatNumber } from '@sbercloud/ft-formatters';
import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonFunction } from '@snack-uikit/button';
import { Tag } from '@snack-uikit/tag';

import { STARTER_GRANT_AMOUNT } from '../../constants';
import { StarterGrant as StarterGrantType } from '../../types';
import styles from './styles.module.scss';

export type StarterGrantProps = StarterGrantType & {
  isMobile?: boolean;
};

export function StarterGrant({ isAvailable, inProcess, onGetGrantClick, isMobile }: StarterGrantProps) {
  const { t } = useLocale('Header');

  const name = t('financialMenuStarterGrantName');
  const amount = formatNumber(STARTER_GRANT_AMOUNT, {
    type: formatNumber.types.DigitSpaces,
    unit: t('financialMenuBonusSign'),
  });
  const buttonLabel = t('financialMenuGetGrant');
  const tagLabel = t('financialMenuGrantIsOnTheWay');

  return (
    <>
      <div className={styles.starterGrant} data-mobile={isMobile}>
        <span className={styles.starterGrantName}>
          {name} <span className={styles.starterGrantAmount}>{`(${amount})`}</span>
        </span>

        {isAvailable && (
          <ButtonFunction
            size='xs'
            appearance='primary'
            label={buttonLabel}
            icon={<PlusSVG />}
            onClick={onGetGrantClick}
          />
        )}

        {inProcess && <Tag size='xs' appearance='blue' label={tagLabel} />}
      </div>
    </>
  );
}
