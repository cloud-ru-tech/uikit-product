import cn from 'classnames';
import { useMemo } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { QuestionTooltipProps } from '@cloud-ru/uikit-product-mobile-tooltip';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Link, LinkProps } from '@snack-uikit/link';
import { Scroll } from '@snack-uikit/scroll';

import { getInvoiceCoverage, splitInvoiceByAvailability } from '../../helpers';
import { CalculatePriceData, DiscountDetails, InvoiceDetails, PriceChangeDetails } from '../../types';
import { ContentBlock, ContentBlockProps } from '../ContentBlock';
import { DiscountBlock } from './components/DiscountBlock';
import { HeaderBlock, HeaderBlockProps } from './components/HeaderBlock';
import { InvoiceBlock } from './components/InvoiceBlock';
import { PriceDetailsBlock } from './components/PriceChangeBlock';
import { TotalValueBlock, TotalValueBlockProps } from './components/TotalValueBlock';
import styles from './styles.module.scss';

export type PriceSummaryProps = WithLayoutType<
  WithSupportProps<
    TotalValueBlockProps &
      Omit<HeaderBlockProps, 'coveredByGrants'> &
      ContentBlockProps & {
        basePrice?: number;
        basePriceLabel?: string;
        discount?: DiscountDetails;
        priceChange?: PriceChangeDetails;
        invoice?: InvoiceDetails[];
        usageInvoice?: InvoiceDetails[];
        calculatePriceData?: CalculatePriceData;
        invoiceExpandedDefault?: boolean;
        usageExpandedDefault?: boolean;
        invoiceTooltip?: QuestionTooltipProps['tip'];
        usageTooltip?: QuestionTooltipProps['tip'];
        docsLink?: {
          href?: LinkProps['href'];
          text?: LinkProps['text'];
        };
        className?: string;
      }
  >
>;

export function PriceSummary({
  value,
  totalSumType,
  hint,
  period,
  onPeriodChanged,
  periodOptions,
  freeTier,
  onFreeTierClick,
  titleTooltip,
  loading,
  dataError,
  onRetry,
  discount,
  invoice,
  usageInvoice,
  calculatePriceData,
  invoiceExpandedDefault = true,
  usageExpandedDefault = false,
  invoiceTooltip,
  usageTooltip,
  docsLink,
  className,
  layoutType,
  hintAppearance,
  showHintTooltip = false,
  hintTooltipText,
  hintLink,
  showHintLink,
  scalingHint,
  valueDelta,
  priceChange,
  basePrice,
  basePriceLabel,
  ...rest
}: PriceSummaryProps) {
  const { t } = useLocale('PriceSummary');
  const timeDetails = useMemo(
    () => splitInvoiceByAvailability(invoice, calculatePriceData),
    [invoice, calculatePriceData],
  );
  const usageDetails = useMemo(
    () => splitInvoiceByAvailability(usageInvoice, calculatePriceData),
    [usageInvoice, calculatePriceData],
  );
  const summaryCoverage = useMemo(
    () => getInvoiceCoverage([...(timeDetails.invoice ?? []), ...(usageDetails.invoice ?? [])]),
    [timeDetails, usageDetails],
  );

  const hasTime = Boolean(timeDetails.invoice?.length || timeDetails.unavailableItems?.length);
  const hasUsage = Boolean(usageDetails.invoice?.length || usageDetails.unavailableItems?.length);
  const hasBreakdown = Boolean(hasTime && (basePrice !== undefined || priceChange || discount));
  const hasContent = hasBreakdown || hasTime || hasUsage || Boolean(docsLink?.href);
  const isReady = !loading && !dataError;

  const hideInnerCoverage = !calculatePriceData || summaryCoverage !== undefined;

  return (
    <div className={cn(styles.priceSummary, className)} {...extractSupportProps(rest)}>
      {(hasTime || hasUsage) && (
        <div
          className={styles.header}
          data-content={Boolean(isReady && hasTime) || undefined}
          role='region'
          aria-label={t('costEstimate')}
        >
          <HeaderBlock
            period={period}
            onPeriodChanged={onPeriodChanged}
            periodOptions={hasTime ? periodOptions : []}
            freeTier={freeTier}
            onFreeTierClick={onFreeTierClick}
            coveredByGrants={isReady ? summaryCoverage : undefined}
            titleTooltip={titleTooltip}
            layoutType={layoutType}
          />
          {hasTime && (
            <ContentBlock loading={loading} dataError={dataError} onRetry={onRetry}>
              <TotalValueBlock
                value={value}
                totalSumType={totalSumType}
                hint={hint ?? (hasUsage ? t('excludingUsage') : undefined)}
                hintAppearance={hintAppearance}
                showHintTooltip={showHintTooltip}
                hintTooltipText={hintTooltipText}
                hintLink={hintLink}
                showHintLink={showHintLink}
                valueDelta={valueDelta}
                scalingHint={scalingHint}
              />
            </ContentBlock>
          )}
        </div>
      )}
      {!hasTime && !isReady && (
        <div className={styles.state}>
          <ContentBlock loading={loading} dataError={dataError} onRetry={onRetry} />
        </div>
      )}
      {isReady && hasContent && (
        <Scroll size='s'>
          {hasBreakdown && (
            <div className={styles.breakdown}>
              <PriceDetailsBlock
                basePrice={basePrice}
                basePriceLabel={basePriceLabel}
                priceChange={priceChange}
                layoutType={layoutType}
              />
              {discount && <DiscountBlock value={discount} layoutType={layoutType} />}
            </div>
          )}
          {hasTime && (
            <div className={styles.timeSection}>
              <InvoiceBlock
                invoice={timeDetails.invoice}
                unavailableItems={timeDetails.unavailableItems}
                invoiceExpandedDefault={invoiceExpandedDefault}
                title={t('timePayment')}
                tooltip={invoiceTooltip ?? t('timePaymentTooltip')}
                hideCoverage={hideInnerCoverage}
                layoutType={layoutType}
              />
            </div>
          )}
          {hasUsage && (
            <div className={styles.usageSection}>
              <InvoiceBlock
                invoice={usageDetails.invoice}
                unavailableItems={usageDetails.unavailableItems}
                invoiceExpandedDefault={usageExpandedDefault}
                title={t('usagePayment')}
                tooltip={usageTooltip ?? t('usagePaymentTooltip')}
                hideCoverage={hideInnerCoverage}
                layoutType={layoutType}
              />
            </div>
          )}
          {docsLink?.href && (
            <div className={styles.footer}>
              <Link
                size='m'
                textMode='default'
                text={docsLink.text || t('docsLink')}
                href={docsLink.href}
                target='_blank'
              />
            </div>
          )}
        </Scroll>
      )}
    </div>
  );
}
