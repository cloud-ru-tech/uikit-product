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
      <ButtonFunction size='xs' icon={<RepeatSVG />} onClick={onRetry} className={styles.retryButton} />
      <span className={styles.noData}>{textProvider(languageCode, Texts.NoData)}</span>
    </div>
  );
}
