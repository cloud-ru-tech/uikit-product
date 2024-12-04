import { CrossSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { InfoBlock } from '@snack-uikit/info-block';

import { textProvider, Texts } from '../../helpers';
import { ReleaseNotesModalProps } from '../../types';
import styles from './styles.module.scss';

type Props = Pick<ReleaseNotesModalProps, 'onDataErrorRetryClick'> & {
  isMobile?: boolean;
};

export function DataErrorInfoBlock({ onDataErrorRetryClick, isMobile = false }: Props) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <InfoBlock
      size={isMobile ? 'm' : 'l'}
      icon={{ icon: CrossSVG, appearance: 'neutral', decor: true }}
      className={isMobile ? undefined : styles.infoBlockDataError}
      title={textProvider<string>(languageCode, Texts.DataErrorTitle)}
      description={textProvider<string>(languageCode, Texts.DataErrorDescription)}
      data-error-action={!isMobile && onDataErrorRetryClick ? true : undefined}
      footer={
        onDataErrorRetryClick ? (
          <InfoBlock.Footer
            primaryButton={{
              label: textProvider<string>(languageCode, Texts.DataErrorAction),
              onClick: onDataErrorRetryClick,
              appearance: 'neutral',
            }}
          />
        ) : undefined
      }
    />
  );
}
