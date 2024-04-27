import cn from 'classnames';

import { LockSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { InfoBlock } from '@snack-uikit/info-block';

import { textProvider, Texts } from '../../helpers/texts-provider';
import { BlockBasic } from '../BlockBasic';
import styles from './styles.module.scss';

export type NoAccessProps = WithSupportProps<{
  serviceName?: string;
  className?: string;
}>;

export function NoAccess({ serviceName, className, ...rest }: NoAccessProps) {
  const { languageCode } = useLanguage();

  return (
    <div {...extractSupportProps(rest)} className={cn(styles.wrapper, className)}>
      {serviceName && <div className={styles.serviceName}>{serviceName}</div>}

      <BlockBasic className={styles.baseBlock}>
        <InfoBlock
          size='m'
          icon={{ icon: LockSVG }}
          title={textProvider(languageCode, Texts.NoAccessTitle)}
          description={
            <div className={styles.description}>
              <div className={styles.text}>{textProvider(languageCode, Texts.NoAccessSubtitle)}</div>
              <div className={styles.text}>{textProvider(languageCode, Texts.NoAccessText)}</div>
            </div>
          }
        />
      </BlockBasic>
    </div>
  );
}
