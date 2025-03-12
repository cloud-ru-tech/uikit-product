import { formatDate, formatNumber } from '@sbercloud/ft-formatters';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { StatusIndicator, StatusIndicatorProps } from '@snack-uikit/status';
import { TruncateString } from '@snack-uikit/truncate-string';

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
  isMobile?: boolean;
};

export function Grant({ name, beginAt, expireAt, initialAmount, currentAmount, status, isMobile }: GrantProps) {
  const { t, lang } = useLocale('Header');

  const currentGrantAmount = formatNumber(Math.round(Number(currentAmount)), {
    type: formatNumber.types.DigitSpaces,
    unit: t('financialMenuBonusSign'),
  });

  const initialGrantAmount = formatNumber(initialAmount, {
    type: formatNumber.types.DigitSpaces,
    unit: t('financialMenuBonusSign'),
  });

  const locale = lang === 'ru-RU' ? { code: 'ru' } : undefined;
  const beginAtFormatted = formatDate(beginAt, formatDate.formatters.DateShortMonth, locale);

  const expireAtFormatted =
    expireAt > INDEFINITE_GRANT_CUTOFF_DATE
      ? t('financialMenuGrantInfinity')
      : formatDate(expireAt, formatDate.formatters.DateShortMonth, locale);

  const isDisableAppearance = status === 'BONUS_GRANT_STATUS_NOT_STARTED' || undefined;

  let statusTextId: string | undefined;
  let statusDateColor: StatusIndicatorProps['appearance'] = 'neutral';

  switch (status) {
    case 'BONUS_GRANT_STATUS_NOT_STARTED': {
      statusTextId = t('financialMenuGrantStatusNotStart');
      break;
    }

    case 'BONUS_GRANT_STATUS_READY': {
      const isSpending = currentAmount !== initialAmount;
      statusTextId = isSpending ? t('financialMenuGrantStatusSpending') : t('financialMenuGrantStatusNotSpending');

      const isChangeStatusColor = Date.now() >= new Date(expireAt).getTime() - DAYS_OF_CHANGE_STATUS_COLOR;
      statusDateColor = isChangeStatusColor ? 'yellow' : 'green';
      break;
    }

    default:
      break;
  }

  if (isMobile) {
    return (
      <>
        <div className={styles.nameWrapper}>
          <div className={styles.name} data-mobile>
            <TruncateString text={name} />

            <div className={styles.initialAmount}>{`(${initialGrantAmount})`}</div>
          </div>

          {statusTextId && <div className={styles.status}>{statusTextId}</div>}
        </div>

        <div className={styles.amountWithDate} data-disabled={isDisableAppearance}>
          <div className={styles.amount}>{currentGrantAmount}</div>

          <div className={styles.dateWrapper}>
            <div
              className={styles.date}
              data-disabled={isDisableAppearance}
            >{`${beginAtFormatted} — ${expireAtFormatted}`}</div>

            <StatusIndicator appearance={statusDateColor} size='s' />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.nameWrapper}>
        <div className={styles.name}>
          {name} <span className={styles.initialAmount}>{`(${initialGrantAmount})`}</span>
        </div>

        {statusTextId && <div className={styles.status}>{statusTextId}</div>}
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
