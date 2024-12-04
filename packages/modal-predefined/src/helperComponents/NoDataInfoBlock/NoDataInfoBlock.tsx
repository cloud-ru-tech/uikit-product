import { useLanguage } from '@sbercloud/uikit-product-utils';
import { InfoBlock } from '@snack-uikit/info-block';

import { textProvider, Texts } from '../../helpers';
import styles from './styles.module.scss';

type Props = {
  isMobile?: boolean;
};

export function NoDataInfoBlock({ isMobile = false }: Props) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <InfoBlock
      size={isMobile ? 'm' : 'l'}
      className={isMobile ? undefined : styles.noDataInfoBlock}
      title={textProvider<string>(languageCode, Texts.NoDataTitle)}
      description={textProvider<string>(languageCode, Texts.NoDataDescription)}
    />
  );
}
