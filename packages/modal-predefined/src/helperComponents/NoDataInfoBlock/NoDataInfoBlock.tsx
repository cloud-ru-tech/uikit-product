import { useLocale } from '@cloud-ru/uikit-product-locale';
import { InfoBlock } from '@snack-uikit/info-block';

import styles from './styles.module.scss';

type Props = {
  isMobile?: boolean;
};

export function NoDataInfoBlock({ isMobile = false }: Props) {
  const { t } = useLocale('ModalPredefined');

  return (
    <InfoBlock
      size={isMobile ? 'm' : 'l'}
      className={isMobile ? undefined : styles.noDataInfoBlock}
      title={t('noDataTitle')}
      description={t('noDataDescription')}
    />
  );
}
