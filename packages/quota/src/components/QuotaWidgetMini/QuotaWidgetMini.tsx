import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { AccordionPrimary } from '@snack-uikit/accordion';
import { ButtonOutline } from '@snack-uikit/button';
import { Counter } from '@snack-uikit/counter';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { QuotaCardsGrid } from '../../helperComponents/QuotaCardsGrid';
import { QuotaWidgetPropsBase } from '../../types';
import styles from './styles.module.scss';

export type QuotaWidgetMiniProps = WithSupportProps<
  QuotaWidgetPropsBase & {
    /** Флаг раскрытия аккордиона по умолчанию */
    isExpandedDefault?: boolean;
  }
>;

const ACCORDION_ID = 'quotas-widget-accordion';

export function QuotaWidgetMini({
  quotas,
  disableSorting,
  isLoading,
  isError,
  onRefresh,
  projectName,
  canEditQuota,
  isExpandedDefault,
  hideIncreaseQuotaButton,
  onIncreaseQuotaClick,
  onWidgetOpen,
  ...props
}: QuotaWidgetMiniProps) {
  const { t } = useLocale('Quota');

  const exhaustedCount = quotas.filter(item => item.remains === 0).length;

  const handleExpandedChange = (expanded: string | undefined) => {
    if (expanded) {
      onWidgetOpen?.();
    }
  };

  return (
    <AccordionPrimary
      {...props}
      expandedDefault={isExpandedDefault ? ACCORDION_ID : undefined}
      onExpandedChange={handleExpandedChange}
    >
      <AccordionPrimary.CollapseBlock
        id={ACCORDION_ID}
        className={styles.collapse}
        header={
          <>
            <div className={styles.title}>
              <Typography.SansTitleM>
                <TruncateString maxLines={1} text={t('quotas')} />
              </Typography.SansTitleM>

              {exhaustedCount > 0 && <Counter value={exhaustedCount} size='s' appearance='red' />}
            </div>

            <Typography.SansBodyM className={styles.subtitle}>
              <TruncateString maxLines={1} text={projectName} />
            </Typography.SansBodyM>
          </>
        }
      >
        <QuotaCardsGrid
          isAccordion
          quotas={quotas}
          disableSorting={disableSorting}
          isLoading={isLoading}
          isError={isError}
          onRefresh={onRefresh}
          isMobile
        />

        {!isError && canEditQuota && !hideIncreaseQuotaButton && (
          <ButtonOutline
            className={styles.button}
            fullWidth
            appearance='neutral'
            label={t('increaseQuota')}
            size='s'
            onClick={onIncreaseQuotaClick}
          />
        )}
      </AccordionPrimary.CollapseBlock>
    </AccordionPrimary>
  );
}
