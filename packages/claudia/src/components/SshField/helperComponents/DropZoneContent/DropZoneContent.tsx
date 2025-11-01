import { useLocale } from '@sbercloud/uikit-product-locale';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export function DropZoneContent() {
  const { t } = useLocale('Claudia');

  return (
    <div className={styles.container}>
      <Typography.SansTitleS className={styles.container}>{t('SshField.dropZone.title')}</Typography.SansTitleS>
      <Typography.SansBodyS className={styles.container}>{t('SshField.dropZone.description')}</Typography.SansBodyS>
    </div>
  );
}
