import cn from 'classnames';

import { InfoFilledSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { LinkProps } from '@snack-uikit/link';
import { Typography } from '@snack-uikit/typography';

import { formatCurrency, textProvider, Texts } from '../../helpers';
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
  const { languageCode } = useLanguage();

  return (
    <div className={cn(styles.priceSummarySmall, className)} {...extractSupportProps(rest)}>
      <Typography.SansBodyM>{textProvider(languageCode, Texts.Total)}</Typography.SansBodyM>

      <ContentBlock loading={loading} dataError={dataError} onRetry={onRetry}>
        <div className={styles.value}>
          <InfoFilledSVG size={16} className={styles.icon} />

          <Typography.SansTitleM>{formatCurrency(value)}</Typography.SansTitleM>
        </div>

        {docsLink?.href && (
          <ButtonFunction
            size='xs'
            label={docsLink.text || textProvider(languageCode, Texts.CostLink)}
            href={docsLink.href}
            target='_blank'
          />
        )}
      </ContentBlock>
    </div>
  );
}
