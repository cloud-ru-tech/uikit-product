import cn from 'classnames';

import { InfoFilledSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { LinkProps } from '@snack-uikit/link';
import { Typography } from '@snack-uikit/typography';

import { formatCurrency } from '../../helpers';
import { ContentBlock, ContentBlockProps } from '../ContentBlock';
import styles from './styles.module.scss';

export type PriceSummarySmallProps = WithSupportProps<
  ContentBlockProps & {
    value: number | undefined;
    docsLink?: {
      href?: LinkProps['href'];
      text?: LinkProps['text'];
    };
    className?: string;
  }
>;

export function PriceSummarySmall({
  value = 0,
  docsLink,
  loading,
  dataError,
  onRetry,
  className,
  ...rest
}: PriceSummarySmallProps) {
  const { t } = useLocale('PriceSummary');

  return (
    <div className={cn(styles.priceSummarySmall, className)} {...extractSupportProps(rest)}>
      <Typography.SansBodyM>{t('total')}</Typography.SansBodyM>

      <ContentBlock loading={loading} dataError={dataError} onRetry={onRetry}>
        <div className={styles.value}>
          <InfoFilledSVG size={16} className={styles.icon} />

          <Typography.SansTitleM>{formatCurrency(value)}</Typography.SansTitleM>
        </div>

        {docsLink?.href && (
          <ButtonFunction size='xs' label={docsLink.text || t('costLink')} href={docsLink.href} target='_blank' />
        )}
      </ContentBlock>
    </div>
  );
}
