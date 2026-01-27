import cn from 'classnames';

import { LockSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { InfoBlock } from '@snack-uikit/info-block';

import { BlockBasic } from '../BlockBasic';
import styles from './styles.module.scss';

export type NoAccessProps = WithSupportProps<{
  serviceName?: string;
  className?: string;
}>;

export function NoAccess({ serviceName, className, ...rest }: NoAccessProps) {
  const { t } = useLocale('Layout');

  return (
    <div {...extractSupportProps(rest)} className={cn(styles.wrapper, className)}>
      {serviceName && <div className={styles.serviceName}>{serviceName}</div>}

      <BlockBasic className={styles.baseBlock}>
        <InfoBlock
          size='m'
          icon={{ icon: LockSVG }}
          title={t('noAccessTitle')}
          description={
            <div className={styles.description}>
              <div className={styles.text}>{t('noAccessSubtitle')}</div>
              <div className={styles.text}>{t('noAccessText')}</div>
            </div>
          }
        />
      </BlockBasic>
    </div>
  );
}
