import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Link, LinkProps } from '@snack-uikit/link';

import { textProvider, Texts } from '../../helpers';
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

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

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
      <DataRow label={textProvider(languageCode, Texts.Created)} value={created} className={styles.created} />

      {exceeded ? (
        <DataRow
          label={textProvider(languageCode, Texts.Exceeded)}
          value={
            increaseLink ? (
              <Link
                textMode='accent'
                text={textProvider(languageCode, Texts.Increase)}
                size='s'
                appearance='red'
                {...increaseLink}
              />
            ) : undefined
          }
          className={styles.available}
        />
      ) : (
        <DataRow label={textProvider(languageCode, Texts.Available)} value={available} className={styles.available} />
      )}
    </QuotaCardLayout>
  );
}
