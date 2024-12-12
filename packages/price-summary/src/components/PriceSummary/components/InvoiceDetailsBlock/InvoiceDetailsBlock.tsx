import { useLanguage, WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { formatCurrency, formatQuantity, textProvider, Texts } from '../../../../helpers';
import { InvoiceDetails } from '../../../../types';
import { Divider } from '../Divider';
import { InvoiceItemBlock } from '../InvoiceItemBlock';
import styles from './styles.module.scss';

export type InvoiceDetailsBlockProps = WithLayoutType<{
  invoice: InvoiceDetails;
}>;

export function InvoiceDetailsBlock({ invoice, layoutType }: InvoiceDetailsBlockProps) {
  const { languageCode } = useLanguage();

  return (
    <div className={styles.main}>
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
        <InvoiceItemBlock key={index} item={item} index={index} layoutType={layoutType} />
      ))}

      {invoice.price !== undefined && (
        <>
          <Divider />

          <div className={styles.footer}>
            <Typography.SansLabelM>
              {textProvider(languageCode, Texts.Price)}: {formatCurrency(invoice.price)}
            </Typography.SansLabelM>
          </div>
        </>
      )}
    </div>
  );
}
