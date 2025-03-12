import { useLocale } from '@sbercloud/uikit-product-locale';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Link, LinkProps } from '@snack-uikit/link';

import { DataRow, NoData, QuotaCardLayout } from './components';
import styles from './styles.module.scss';

export type QuotaCardProps = WithSupportProps<{
  loading?: boolean;
  title: string;
  created?: number;
  limit?: number;
  increaseLink?: Pick<LinkProps, 'target' | 'href' | 'onClick'>;
  onRetry?(): void;
}>;

export function QuotaCard({ loading, title, limit, created, increaseLink, onRetry, ...rest }: QuotaCardProps) {
  const available = (limit ?? 0) - (created ?? 0);
  const exceeded = available <= 0;

  const { t } = useLocale('Quota');

  const noData = limit === undefined || created === undefined;

  if (noData) {
    return (
      <QuotaCardLayout title={title} exceeded={exceeded} loading={loading} {...extractSupportProps(rest)}>
        <NoData onRetry={onRetry} />
      </QuotaCardLayout>
    );
  }

  return (
    <QuotaCardLayout title={title} exceeded={exceeded} loading={loading} {...extractSupportProps(rest)}>
      <DataRow label={t('created')} value={created} className={styles.created} />

      {exceeded ? (
        <DataRow
          label={t('exceeded')}
          value={
            increaseLink ? (
              <Link textMode='accent' text={t('increase')} size='s' appearance='red' {...increaseLink} />
            ) : undefined
          }
          className={styles.available}
        />
      ) : (
        <DataRow label={t('available')} value={available} className={styles.available} />
      )}
    </QuotaCardLayout>
  );
}
