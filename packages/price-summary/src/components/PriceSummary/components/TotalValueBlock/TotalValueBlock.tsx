import { ReactNode } from 'react';

import { InfoFilledSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { AlarmFilledSVG, CrossFilledSVG, QuestionSVG } from '@snack-uikit/icons';
import { Link } from '@snack-uikit/link';
import { Tooltip } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';
import { ValueOf } from '@snack-uikit/utils';

import { formatCurrency, formatCurrencyValue } from '../../../../helpers';
import { PriceDeltaDetails, TotalSumType, TotalValueRange } from '../../../../types';
import styles from './styles.module.scss';

export const APPEARANCE_STATE = {
  Default: 'default',
  UserError: 'userError',
  SystemError: 'systemError',
  Warning: 'warning',
} as const;

export type AppearanceState = ValueOf<typeof APPEARANCE_STATE>;

export type TotalValueBlockProps = {
  value?: number | TotalValueRange;
  valueDelta?: PriceDeltaDetails;
  totalSumType?: TotalSumType;
  hint?: string;
  hintAppearance?: AppearanceState;
  showHintTooltip?: boolean;
  hintTooltipText?: ReactNode;
  hintLink?: {
    href?: string;
    text: string;
  };
  showHintLink?: boolean;
};

function getAppearanceIcon(appearance: string) {
  let Component: typeof InfoFilledSVG;

  switch (appearance) {
    case APPEARANCE_STATE.Warning:
      Component = AlarmFilledSVG;
      break;
    case APPEARANCE_STATE.UserError:
      Component = CrossFilledSVG;
      break;
    case APPEARANCE_STATE.SystemError:
      Component = QuestionSVG;
      break;
    case APPEARANCE_STATE.Default:
    default:
      Component = InfoFilledSVG;
      break;
  }

  return <Component size={16} data-appearance={appearance} className={styles.hintIcon} />;
}

function getTotalSumPrefix(totalSumType: TotalSumType, fromPrefix: string, toPrefix: string) {
  if (totalSumType === 'from') {
    return `${fromPrefix} `;
  }

  if (totalSumType === 'to') {
    return `${toPrefix} `;
  }

  return '';
}

function isTotalValueRange(value: TotalValueBlockProps['value']): value is TotalValueRange {
  return typeof value === 'object' && value !== null;
}

function formatTotalValueRange(value: TotalValueRange) {
  return `${formatCurrencyValue(value.min)} — ${formatCurrencyValue(value.max)} ₽`;
}

function formatTotalValue(
  value: TotalValueBlockProps['value'],
  totalSumType: TotalSumType,
  fromPrefix: string,
  toPrefix: string,
) {
  if (isTotalValueRange(value)) {
    return formatTotalValueRange(value);
  }

  if (value === undefined) {
    return 'N/A';
  }

  return `${getTotalSumPrefix(totalSumType, fromPrefix, toPrefix)}${formatCurrency(value)}`;
}

export function TotalValueBlock({
  value,
  totalSumType = 'equal',
  hint,
  hintAppearance = APPEARANCE_STATE.Default,
  showHintTooltip,
  hintTooltipText,
  hintLink,
  showHintLink,
  valueDelta,
}: TotalValueBlockProps) {
  const { t } = useLocale('PriceSummary');
  const displayedAppearance = hintAppearance ?? APPEARANCE_STATE.Default;
  const displayedHint = hint ?? t('preliminaryHint');
  const totalValue = formatTotalValue(value, totalSumType, t('totalSumFromPrefix'), t('totalSumToPrefix'));

  return (
    <div className={styles.content} data-appearance={displayedAppearance}>
      <Typography.LightHeadlineS className={isTotalValueRange(value) ? styles.rangeValue : undefined}>
        {totalValue}
      </Typography.LightHeadlineS>

      {valueDelta && (
        <Typography.SansBodyS className={styles.valueDelta}>
          {`${t(`${valueDelta.type}Price`)} ${formatCurrency(valueDelta.value)}`}
        </Typography.SansBodyS>
      )}

      <Tooltip
        open={showHintTooltip && hintTooltipText ? undefined : false}
        tip={hintTooltipText}
        placement='left-start'
      >
        {displayedHint && (
          <div className={styles.hint} data-appearance={displayedAppearance}>
            {getAppearanceIcon(displayedAppearance)}
            <Typography.SansBodyS>{displayedHint}</Typography.SansBodyS>
          </div>
        )}
      </Tooltip>
      {showHintLink && (
        <Link
          textMode='accent'
          appearance='neutral'
          size='s'
          href={hintLink?.href}
          text={hintLink?.text}
          className={styles.link}
        />
      )}
    </div>
  );
}
