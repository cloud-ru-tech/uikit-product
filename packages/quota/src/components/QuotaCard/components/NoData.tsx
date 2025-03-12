import { RepeatSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonFunction } from '@snack-uikit/button';

import styles from '../styles.module.scss';

type NoDataProps = {
  onRetry?(): void;
};

export function NoData({ onRetry }: NoDataProps) {
  const { t } = useLocale('Quota');

  return (
    <div className={styles.noDataWrapper}>
      <ButtonFunction size='xs' icon={<RepeatSVG />} onClick={onRetry} className={styles.retryButton} />
      <span className={styles.noData}>{t('noData')}</span>
    </div>
  );
}
