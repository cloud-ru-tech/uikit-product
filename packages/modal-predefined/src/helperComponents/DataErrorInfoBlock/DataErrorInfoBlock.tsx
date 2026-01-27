import { CrossSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { InfoBlock } from '@snack-uikit/info-block';

import { ReleaseNotesModalProps } from '../../types';
import styles from './styles.module.scss';

type Props = Pick<ReleaseNotesModalProps, 'onDataErrorRetryClick'> & {
  isMobile?: boolean;
};

export function DataErrorInfoBlock({ onDataErrorRetryClick, isMobile = false }: Props) {
  const { t } = useLocale('ModalPredefined');

  return (
    <InfoBlock
      size={isMobile ? 'm' : 'l'}
      icon={{ icon: CrossSVG, appearance: 'neutral', decor: true }}
      className={isMobile ? undefined : styles.infoBlockDataError}
      title={t('dataErrorTitle')}
      description={t('dataErrorDescription')}
      data-error-action={!isMobile && onDataErrorRetryClick ? true : undefined}
      footer={
        onDataErrorRetryClick ? (
          <InfoBlock.Footer
            primaryButton={{
              label: t('dataErrorAction'),
              onClick: onDataErrorRetryClick,
              appearance: 'neutral',
            }}
          />
        ) : undefined
      }
    />
  );
}
