import { useLocale } from '@sbercloud/uikit-product-locale';
import { HotSpot } from '@snack-uikit/hot-spot';
import { Popover } from '@snack-uikit/popover';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export function SearchSettingsHotSpot() {
  const { t } = useLocale('Header');

  return (
    <Popover
      tip={
        <div className={styles.searchSettingsPopoverContent}>
          <Typography.SansTitleS>{t('searchSettingsPopoverHeader')}</Typography.SansTitleS>
          <Typography.SansBodyS>{t('searchSettingsPopoverDescription')}</Typography.SansBodyS>
        </div>
      }
      trigger='hover'
      placement='bottom-end'
      hoverDelayOpen={100}
    >
      <HotSpot enabled pulse placement='right-top' />
    </Popover>
  );
}
