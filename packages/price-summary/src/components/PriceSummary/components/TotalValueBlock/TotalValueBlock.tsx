import { ReactNode } from 'react';

import { InfoFilledSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { AlarmFilledSVG, CrossFilledSVG, QuestionSVG } from '@snack-uikit/icons';
import { Link } from '@snack-uikit/link';
import { Tooltip } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';
import { ValueOf } from '@snack-uikit/utils';

import { formatCurrency } from '../../../../helpers';
import { TotalSumType } from '../../../../types';
import styles from './styles.module.scss';

export const APPEARANCE_STATE = {
  Default: 'default',
  UserError: 'userError',
  SystemError: 'systemError',
  Warning: 'warning',
} as const;

export type AppearanceState = ValueOf<typeof APPEARANCE_STATE>;

export type TotalValueBlockProps = {
  value?: number;
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

export function TotalValueBlock({
  value,
  totalSumType = 'equal',
  hint,
  hintAppearance = APPEARANCE_STATE.Default,
  showHintTooltip,
  hintTooltipText,
  hintLink,
  showHintLink,
}: TotalValueBlockProps) {
  const { t } = useLocale('PriceSummary');

  const totalSumPrefix = totalSumType === 'from' ? `${t('totalSumFromPrefix')} ` : '';

  return (
    <div className={styles.content} data-appearance={hintAppearance}>
      <Typography.LightHeadlineS>
        {value !== undefined ? `${totalSumPrefix}${formatCurrency(Number(value))}` : 'N/A'}
      </Typography.LightHeadlineS>

      <Tooltip
        open={showHintTooltip && hintTooltipText ? undefined : false}
        tip={hintTooltipText}
        placement='left-start'
      >
        {hint && (
          <div className={styles.hint} data-appearance={hintAppearance}>
            {getAppearanceIcon(hintAppearance)}
            <Typography.SansBodyS>{hint}</Typography.SansBodyS>
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
