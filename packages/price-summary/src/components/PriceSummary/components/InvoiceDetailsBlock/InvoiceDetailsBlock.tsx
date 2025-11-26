import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { formatCurrency, formatQuantity } from '../../../../helpers';
import { InvoiceDetails } from '../../../../types';
import { CoveredByGrantLabel } from '../CoveredByGrantLabel';
import { Divider } from '../Divider';
import { InvoiceItemBlock } from '../InvoiceItemBlock';
import styles from './styles.module.scss';

export type InvoiceDetailsBlockProps = WithLayoutType<{
  invoice: InvoiceDetails;
}>;

export function InvoiceDetailsBlock({ invoice, layoutType }: InvoiceDetailsBlockProps) {
  const { t } = useLocale('PriceSummary');

  const primaryItems = invoice.items.filter(item => item.primary);
  const firstValue = primaryItems[0]?.coveredByGrant;
  const allSameValue = primaryItems.length > 0 && primaryItems.every(item => item.coveredByGrant === firstValue);

  const showBlockLabel = allSameValue && firstValue !== undefined;
  const showItemLabels = !showBlockLabel;

  return (
    <div className={styles.main}>
      {showBlockLabel && <CoveredByGrantLabel covered={firstValue} />}

      {invoice.title && (
        <>
          <div className={styles.header}>
            <Typography.SansLabelM>{invoice.title}</Typography.SansLabelM>
            {invoice.quantity && <Typography.SansLabelM>{formatQuantity(invoice.quantity)}</Typography.SansLabelM>}
          </div>

          <Divider />
        </>
      )}

      {invoice.items.map((item, index) => (
        <InvoiceItemBlock
          key={index}
          item={item}
          index={index}
          layoutType={layoutType}
          showCoveredByGrantLabel={showItemLabels}
        />
      ))}

      {invoice.price !== undefined && (
        <>
          <Divider />

          <div className={styles.footer}>
            <Typography.SansLabelM>
              {t('price')}: {formatCurrency(invoice.price)}
            </Typography.SansLabelM>
          </div>
        </>
      )}
    </div>
  );
}
