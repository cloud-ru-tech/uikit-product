import { useId } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { AccordionSecondary } from '@snack-uikit/accordion';
import { Typography } from '@snack-uikit/typography';

import { InvoiceDetails, InvoiceItem } from '../../../../types';
import { InvoiceDetailsBlock } from '../InvoiceDetailsBlock';
import styles from './styles.module.scss';

export type InvoiceBlockProps = WithLayoutType<{
  invoice?: InvoiceDetails[];
  unavailableItems?: InvoiceItem[];
  invoiceExpandedDefault?: boolean;
}>;

export function InvoiceBlock({ invoice, unavailableItems, invoiceExpandedDefault, layoutType }: InvoiceBlockProps) {
  const { t } = useLocale('PriceSummary');

  const invoiceBlockId = useId();

  return (
    <AccordionSecondary
      expandedDefault={invoiceExpandedDefault ? invoiceBlockId : undefined}
      className={styles.accordion}
    >
      <AccordionSecondary.CollapseBlock
        id={invoiceBlockId}
        header={
          <Typography.SansBodyM className={styles.accordionHeaderTitle}>{t('orderDetails')}</Typography.SansBodyM>
        }
      >
        <div className={styles.accordionContent}>
          {unavailableItems?.length && (
            <InvoiceDetailsBlock
              invoice={{ title: t('unavailableByContract'), items: unavailableItems }}
              layoutType={layoutType}
              showCoveredByGrantLabels={false}
              titleAsRedTag
            />
          )}

          {invoice?.map((invoice, index) => (
            <InvoiceDetailsBlock key={index} invoice={invoice} layoutType={layoutType} />
          ))}
        </div>
      </AccordionSecondary.CollapseBlock>
    </AccordionSecondary>
  );
}
