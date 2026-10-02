import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import styles from './styles.module.scss';

type PlayerErrorProps = WithLayoutType<{
  'data-test-id': string;
}>;

export function PlayerError({ layoutType, 'data-test-id': dataTestId }: PlayerErrorProps) {
  const { t } = useLocale('SiteMedia');

  return (
    <div className={styles.root} data-layout-type={layoutType} data-test-id={dataTestId}>
      <div className={styles.title}>{t('Video.errorTitle')}</div>
      <div className={styles.description}>{t('Video.errorDescription')}</div>
    </div>
  );
}
