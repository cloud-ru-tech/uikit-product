import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { PromoTag } from '@snack-uikit/promo-tag';
import { Typography } from '@snack-uikit/typography';

import { getInvoiceCoverage } from '../../../../helpers';
import { InvoiceDetails } from '../../../../types';
import { CoveredByGrantLabel } from '../CoveredByGrantLabel';
import { Divider } from '../Divider';
import { InvoiceItemBlock } from '../InvoiceItemBlock';
import styles from './styles.module.scss';

export type InvoiceDetailsBlockProps = WithLayoutType<{
  invoice: InvoiceDetails;
  showCoveredByGrantLabels?: boolean;
  titleAsRedTag?: boolean;
}>;

export function InvoiceDetailsBlock({
  invoice,
  layoutType,
  showCoveredByGrantLabels = true,
  titleAsRedTag = false,
}: InvoiceDetailsBlockProps) {
  const coverage = getInvoiceCoverage([invoice]);

  return (
    <div className={styles.main} data-unavailable={titleAsRedTag || undefined}>
      {showCoveredByGrantLabels ? (
        <div className={styles.coveredByGrantLabel}>
          <CoveredByGrantLabel covered={coverage ?? false} layoutType={layoutType} />
        </div>
      ) : undefined}
      {invoice.title && (
        <>
          <div>
            {titleAsRedTag ? (
              <PromoTag appearance='red' color='decor' size='xxs' text={invoice.title} />
            ) : (
              <Typography.SansLabelM>{invoice.title}</Typography.SansLabelM>
            )}
            {invoice.subtitle && (
              <Typography.SansBodyS tag='div' className={styles.subtitle}>
                {invoice.subtitle}
              </Typography.SansBodyS>
            )}
          </div>
          <Divider />
        </>
      )}
      {invoice.items.map((item, index) => (
        <InvoiceItemBlock key={index} item={item} layoutType={layoutType} unavailable={titleAsRedTag} />
      ))}
    </div>
  );
}
