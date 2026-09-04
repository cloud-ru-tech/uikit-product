import cn from 'classnames';
import { useMemo } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Link, LinkProps } from '@snack-uikit/link';

import { splitInvoiceByAvailability } from '../../helpers';
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
      HeaderBlockProps &
      ContentBlockProps & {
        basePrice?: number;
        discount?: DiscountDetails;
        priceChange?: PriceChangeDetails;
        invoice?: InvoiceDetails[];
        calculatePriceData?: CalculatePriceData;
        invoiceExpandedDefault?: boolean;
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
  promoBadge,
  loading,
  dataError,
  onRetry,
  discount,
  invoice,
  calculatePriceData,
  invoiceExpandedDefault = true,
  docsLink,
  className,
  layoutType,
  hintAppearance,
  showHintTooltip = false,
  hintTooltipText,
  hintLink,
  showHintLink,
  valueDelta,
  priceChange,
  basePrice,
  ...rest
}: PriceSummaryProps) {
  const { t } = useLocale('PriceSummary');
  const { invoice: enrichedInvoice, unavailableItems } = useMemo(
    () => splitInvoiceByAvailability(invoice, calculatePriceData),
    [invoice, calculatePriceData],
  );

  return (
    <div className={cn(styles.priceSummary, className)} {...extractSupportProps(rest)}>
      <HeaderBlock
        period={period}
        onPeriodChanged={onPeriodChanged}
        periodOptions={periodOptions}
        promoBadge={promoBadge}
        layoutType={layoutType}
      />

      <ContentBlock loading={loading} dataError={dataError} onRetry={onRetry}>
        {discount && <DiscountBlock value={discount} layoutType={layoutType} />}

        {(basePrice || priceChange) && <PriceDetailsBlock priceChange={priceChange} basePrice={basePrice} />}

        <TotalValueBlock
          value={value}
          totalSumType={totalSumType}
          hint={hint}
          hintAppearance={hintAppearance}
          showHintTooltip={showHintTooltip}
          hintTooltipText={hintTooltipText}
          hintLink={hintLink}
          showHintLink={showHintLink}
          valueDelta={valueDelta}
        />

        {(enrichedInvoice?.length || unavailableItems?.length) && (
          <InvoiceBlock
            invoice={enrichedInvoice}
            unavailableItems={unavailableItems}
            invoiceExpandedDefault={invoiceExpandedDefault}
            layoutType={layoutType}
          />
        )}

        {docsLink?.href && (
          <Link
            size='m'
            textMode='default'
            text={docsLink.text || t('docsLink')}
            href={docsLink.href}
            target='_blank'
          />
        )}
      </ContentBlock>
    </div>
  );
}
