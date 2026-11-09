import { MouseEvent, useId, useState } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { QuestionTooltipProps } from '@cloud-ru/uikit-product-mobile-tooltip';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { AccordionSecondary } from '@snack-uikit/accordion';
import { ChevronDownSVG } from '@snack-uikit/icons';
import { Typography } from '@snack-uikit/typography';

import { getInvoiceCoverage, splitInvoiceByCoverage } from '../../../../helpers';
import { InvoiceDetails } from '../../../../types';
import { CoveredByGrantLabel } from '../CoveredByGrantLabel';
import { InvoiceDetailsBlock } from '../InvoiceDetailsBlock';
import { SummaryTooltip } from '../SummaryTooltip';
import styles from './styles.module.scss';

export type InvoiceBlockProps = WithLayoutType<{
  invoice?: InvoiceDetails[];
  unavailableItems?: InvoiceDetails['items'];
  invoiceExpandedDefault?: boolean;
  title: string;
  tooltip: QuestionTooltipProps['tip'];
  hideCoverage?: boolean;
}>;

export function InvoiceBlock({
  invoice,
  unavailableItems,
  invoiceExpandedDefault = true,
  title,
  tooltip,
  hideCoverage,
  layoutType,
}: InvoiceBlockProps) {
  const { t } = useLocale('PriceSummary');
  const invoiceBlockId = useId();
  const [expanded, setExpanded] = useState(invoiceExpandedDefault);
  const coverage = getInvoiceCoverage(invoice);
  const boxes = splitInvoiceByCoverage(invoice ?? []);

  const handleExpandedChange = (value: string | undefined) => {
    setExpanded(value === invoiceBlockId);
  };

  const handleHeaderClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setExpanded(value => !value);
  };

  return (
    <div className={styles.section}>
      {hideCoverage || coverage === undefined ? undefined : (
        <CoveredByGrantLabel covered={coverage ?? false} layoutType={layoutType} />
      )}
      <AccordionSecondary
        expanded={expanded ? invoiceBlockId : ''}
        onExpandedChange={handleExpandedChange}
        className={styles.accordion}
      >
        <AccordionSecondary.CollapseBlock
          id={invoiceBlockId}
          header={
            <div className={styles.heading} data-expanded={expanded || undefined}>
              <button
                type='button'
                className={styles.toggle}
                aria-expanded={expanded}
                aria-controls={invoiceBlockId}
                onClick={handleHeaderClick}
              >
                <Typography.SansBodyM>{title}</Typography.SansBodyM>
              </button>
              <SummaryTooltip tip={tooltip} label={title} layoutType={layoutType} />
              <ChevronDownSVG className={styles.chevron} size={24} aria-hidden />
            </div>
          }
        >
          <div className={styles.accordionContent} id={invoiceBlockId}>
            {unavailableItems && unavailableItems.length > 0 && (
              <InvoiceDetailsBlock
                invoice={{ title: t('unavailableByContract'), items: unavailableItems }}
                layoutType={layoutType}
                showCoveredByGrantLabels={false}
                titleAsRedTag
              />
            )}
            {boxes.map((box, index) => (
              <InvoiceDetailsBlock
                key={index}
                invoice={box}
                layoutType={layoutType}
                showCoveredByGrantLabels={!hideCoverage && coverage === undefined}
              />
            ))}
          </div>
        </AccordionSecondary.CollapseBlock>
      </AccordionSecondary>
    </div>
  );
}
