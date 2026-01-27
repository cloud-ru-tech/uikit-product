import cn from 'classnames';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Link, LinkProps } from '@snack-uikit/link';

import { DiscountDetails, InvoiceDetails } from '../../types';
import { ContentBlock, ContentBlockProps } from '../ContentBlock';
import { DiscountBlock } from './components/DiscountBlock';
import { HeaderBlock, HeaderBlockProps } from './components/HeaderBlock';
import { InvoiceBlock } from './components/InvoiceBlock';
import { TotalValueBlock, TotalValueBlockProps } from './components/TotalValueBlock';
import styles from './styles.module.scss';

export type PriceSummaryProps = WithLayoutType<
  WithSupportProps<
    TotalValueBlockProps &
      HeaderBlockProps &
      ContentBlockProps & {
        discount?: DiscountDetails;
        invoice?: InvoiceDetails[];
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
  invoiceExpandedDefault = true,
  docsLink,
  className,
  layoutType,
  hintAppearance,
  showHintTooltip = false,
  hintTooltipText,
  hintLink,
  showHintLink,
  ...rest
}: PriceSummaryProps) {
  const { t } = useLocale('PriceSummary');
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

        <TotalValueBlock
          value={value}
          totalSumType={totalSumType}
          hint={hint}
          hintAppearance={hintAppearance}
          showHintTooltip={showHintTooltip}
          hintTooltipText={hintTooltipText}
          hintLink={hintLink}
          showHintLink={showHintLink}
        />

        {invoice?.length && (
          <InvoiceBlock invoice={invoice} invoiceExpandedDefault={invoiceExpandedDefault} layoutType={layoutType} />
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
