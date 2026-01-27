import { useMemo } from 'react';

import { CrossFilledSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { ButtonTonal, ButtonTonalProps } from '@snack-uikit/button';
import { TruncateString } from '@snack-uikit/truncate-string';

import { checkExceeded } from '../../utils';
import { DataRow, NoData, QuotaCardLayout } from './components';
import styles from './styles.module.scss';

type QuotaCardCommonProps = WithSupportProps<{
  loading?: boolean;
  title: string;
  created?: number;
  limit?: number;
  unlimited?: boolean;
  increaseLink?: Pick<ButtonTonalProps, 'target' | 'href' | 'onClick'>;
  onRetry?(): void;
}>;

export type QuotaCardProps = QuotaCardCommonProps &
  (
    | {
        type?: 'instances' | 'value';
        customUnit?: never;
        customLabel?: never;
      }
    | {
        type: 'custom';
        customUnit: string;
        customLabel: string;
      }
  );

export function QuotaCard({
  loading,
  title,
  limit,
  created,
  increaseLink,
  onRetry,
  unlimited = false,
  type = 'instances',
  customUnit,
  customLabel,
  ...rest
}: QuotaCardProps) {
  const available = (limit ?? 0) - (created ?? 0);
  const exceeded = checkExceeded(available);

  const { t } = useLocale('Quota');

  const noData = limit === undefined || created === undefined;

  const { unit, label } = useMemo(() => {
    switch (type) {
      case 'value':
        return { unit: t('gb'), label: t('filled') };
      case 'custom':
        return { unit: customUnit ?? '', label: customLabel ?? '' };
      default:
        return { unit: t('peace'), label: t('created') };
    }
  }, [t, type, customUnit, customLabel]);

  if (noData) {
    return (
      <QuotaCardLayout title={title} exceeded={exceeded} loading={loading} {...extractSupportProps(rest)}>
        <NoData onRetry={onRetry} />
      </QuotaCardLayout>
    );
  }

  return (
    <QuotaCardLayout title={title} exceeded={exceeded} loading={loading} {...extractSupportProps(rest)}>
      <DataRow unit={unit} label={label} value={created} className={styles.created} />

      {exceeded && !unlimited ? (
        <DataRow
          unit={unit}
          label={
            <span className={styles.exceededState}>
              <CrossFilledSVG size={16} />
              <TruncateString text={t('exceeded')} maxLines={1} />
            </span>
          }
          value={increaseLink ? <ButtonTonal size='xs' label={t('increase')} {...increaseLink} /> : undefined}
          className={styles.available}
        />
      ) : (
        <DataRow
          unit={unit}
          label={t('available')}
          value={unlimited ? <span className={styles.text}>{t('unlimited')}</span> : available}
          className={styles.available}
        />
      )}
    </QuotaCardLayout>
  );
}
