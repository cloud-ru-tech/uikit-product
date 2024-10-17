import { formatDate, formatNumber } from '@sbercloud/ft-formatters';
import { LanguageCodeType, useLanguage } from '@sbercloud/uikit-product-utils';
import { StatusIndicator, StatusIndicatorProps } from '@snack-uikit/status';

import { textProvider, Texts } from '../../../../../../helpers';
import { DAYS_OF_CHANGE_STATUS_COLOR, INDEFINITE_GRANT_CUTOFF_DATE } from './constants';
import styles from './styles.module.scss';

type BonusGrantStatus =
  | 'BONUS_GRANT_STATUS_UNSPECIFIED'
  | 'BONUS_GRANT_STATUS_PENDING'
  | 'BONUS_GRANT_STATUS_READY'
  | 'BONUS_GRANT_STATUS_OUT_OF_BONUSES'
  | 'BONUS_GRANT_STATUS_NOT_STARTED'
  | 'BONUS_GRANT_STATUS_EXPIRED'
  | 'BONUS_GRANT_STATUS_CANCELED';

export type GrantProps = {
  id: string;
  name: string;
  beginAt: string;
  expireAt: string;
  initialAmount: string;
  currentAmount: string;
  spentAmount: string;
  status: BonusGrantStatus;
};

export function Grant({ name, beginAt, expireAt, initialAmount, currentAmount, status }: GrantProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const currentGrantAmount = formatNumber(Math.round(Number(currentAmount)), {
    type: formatNumber.types.DigitSpaces,
    unit: textProvider(languageCode, Texts.FinancialMenuBonusSign),
  });

  const initialGrantAmount = formatNumber(initialAmount, {
    type: formatNumber.types.DigitSpaces,
    unit: textProvider(languageCode, Texts.FinancialMenuBonusSign),
  });

  const locale = languageCode === LanguageCodeType.ruRU ? { code: 'ru' } : undefined;
  const beginAtFormatted = formatDate(beginAt, formatDate.formatters.DateShortMonth, locale);

  const expireAtFormatted =
    expireAt > INDEFINITE_GRANT_CUTOFF_DATE
      ? textProvider(languageCode, Texts.FinancialMenuGrantInfinity)
      : formatDate(expireAt, formatDate.formatters.DateShortMonth, locale);

  const isDisableAppearance = status === 'BONUS_GRANT_STATUS_NOT_STARTED' || undefined;

  let statusTextId;
  let statusDateColor: StatusIndicatorProps['appearance'] = 'neutral';

  switch (status) {
    case 'BONUS_GRANT_STATUS_NOT_STARTED': {
      statusTextId = Texts.FinancialMenuGrantStatusNotStart;
      break;
    }

    case 'BONUS_GRANT_STATUS_READY': {
      const isSpending = currentAmount !== initialAmount;
      statusTextId = isSpending ? Texts.FinancialMenuGrantStatusSpending : Texts.FinancialMenuGrantStatusNotSpending;

      const isChangeStatusColor = Date.now() >= new Date(expireAt).getTime() - DAYS_OF_CHANGE_STATUS_COLOR;
      statusDateColor = isChangeStatusColor ? 'yellow' : 'green';
      break;
    }

    default:
      break;
  }

  return (
    <>
      <div className={styles.nameWrapper}>
        <div className={styles.name}>
          {name} <span className={styles.initialAmount}>{`(${initialGrantAmount})`}</span>
        </div>
        {statusTextId && <div className={styles.status}>{textProvider(languageCode, statusTextId)}</div>}
      </div>
      <div className={styles.amount} data-disabled={isDisableAppearance}>
        {currentGrantAmount}
      </div>
      <div className={styles.dateWrapper}>
        <div
          className={styles.date}
          data-disabled={isDisableAppearance}
        >{`${beginAtFormatted} — ${expireAtFormatted}`}</div>
        <StatusIndicator appearance={statusDateColor} size='s' />
      </div>
    </>
  );
}
