import { RepeatSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';

import { textProvider, Texts } from '../../../helpers';
import styles from '../styles.module.scss';

type NoDataProps = {
  onRetry?(): void;
};

export function NoData({ onRetry }: NoDataProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  return (
    <div className={styles.noDataWrapper}>
      <span className={styles.noData}>{textProvider(languageCode, Texts.NoData)}</span>
      <ButtonFunction size='m' icon={<RepeatSVG />} onClick={onRetry} className={styles.retryButton} />
    </div>
  );
}
