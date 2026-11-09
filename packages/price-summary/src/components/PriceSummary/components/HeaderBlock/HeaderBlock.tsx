import { useLocale } from '@cloud-ru/uikit-product-locale';
import { QuestionTooltipProps } from '@cloud-ru/uikit-product-mobile-tooltip';
import { Typography } from '@snack-uikit/typography';

import { PeriodControl, PeriodControlProps } from '../PeriodControl';
import { SummaryTags, SummaryTagsProps } from '../SummaryTags';
import { SummaryTooltip } from '../SummaryTooltip';
import styles from './styles.module.scss';

export type HeaderBlockProps = PeriodControlProps &
  SummaryTagsProps & {
    titleTooltip?: QuestionTooltipProps['tip'];
  };

export function HeaderBlock({
  period,
  onPeriodChanged,
  periodOptions,
  layoutType,
  titleTooltip,
  ...tags
}: HeaderBlockProps) {
  const { t } = useLocale('PriceSummary');

  return (
    <>
      <SummaryTags {...tags} layoutType={layoutType} />
      <div className={styles.headline}>
        <div className={styles.titleStack}>
          <div className={styles.title}>
            <Typography.SansBodyM>{t('costEstimate')}</Typography.SansBodyM>
            <SummaryTooltip
              tip={titleTooltip ?? t('costEstimateTooltip')}
              label={t('costEstimate')}
              layoutType={layoutType}
            />
          </div>
          <Typography.SansBodyS className={styles.vat}>{t('vat')}</Typography.SansBodyS>
        </div>
        <PeriodControl period={period} onPeriodChanged={onPeriodChanged} periodOptions={periodOptions} />
      </div>
    </>
  );
}
