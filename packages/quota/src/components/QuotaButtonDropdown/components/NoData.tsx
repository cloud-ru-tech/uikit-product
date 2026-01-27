import { RepeatSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { ButtonFunction } from '@snack-uikit/button';

import styles from '../styles.module.scss';

type NoDataProps = {
  onRetry?(): void;
};

export function NoData({ onRetry }: NoDataProps) {
  const { t } = useLocale('Quota');

  return (
    <div className={styles.noDataWrapper}>
      <span className={styles.noData}>{t('noData')}</span>
      <ButtonFunction size='m' icon={<RepeatSVG />} onClick={onRetry} className={styles.retryButton} />
    </div>
  );
}
