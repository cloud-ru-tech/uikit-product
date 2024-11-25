import cn from 'classnames';

import { extractSupportProps, useLanguage, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Link, LinkProps } from '@snack-uikit/link';

import { textProvider, Texts } from '../../helpers';
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
  ...rest
}: PriceSummaryProps) {
  const { languageCode } = useLanguage();

  return (
    <div className={cn(styles.priceSummary, className)} {...extractSupportProps(rest)}>
      <HeaderBlock
        period={period}
        onPeriodChanged={onPeriodChanged}
        periodOptions={periodOptions}
        promoBadge={promoBadge}
      />

      <ContentBlock loading={loading} dataError={dataError} onRetry={onRetry}>
        {discount && <DiscountBlock value={discount} layoutType={layoutType} />}

        <TotalValueBlock value={value} hint={hint} />

        {invoice?.length && (
          <InvoiceBlock invoice={invoice} invoiceExpandedDefault={invoiceExpandedDefault} layoutType={layoutType} />
        )}

        {docsLink?.href && (
          <Link
            size='m'
            textMode='default'
            text={docsLink.text || textProvider(languageCode, Texts.DocsLink)}
            href={docsLink.href}
            target='_blank'
          />
        )}
      </ContentBlock>
    </div>
  );
}
