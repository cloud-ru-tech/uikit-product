import { CrossSVG, UpdateSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { ButtonFilled } from '@snack-uikit/button';
import { InfoBlock } from '@snack-uikit/info-block';
import { Skeleton } from '@snack-uikit/skeleton';

import { WidgetProps } from '../../components/Widget/types';
import styles from './styles.module.scss';

export function Content({
  children,
  state,
  loadingState,
  errorState,
  layoutType,
}: Pick<WidgetProps, 'children' | 'state' | 'loadingState' | 'errorState' | 'layoutType'>) {
  const { t } = useLocale('Widget');
  const isMobile = layoutType === 'mobile';

  switch (state) {
    case 'loading': {
      if (loadingState?.loadingContent) {
        return loadingState.loadingContent;
      }

      if (loadingState?.showSkeleton) {
        return (
          <div className={styles.skeletonContent}>
            <Skeleton loading width='100%' height={80} borderRadius={8} />
          </div>
        );
      }

      return null;
    }

    case 'error': {
      return (
        <InfoBlock
          size='m'
          className={styles.infoBlock}
          icon={errorState?.errorIcon ?? { icon: CrossSVG, appearance: 'neutral', decor: true }}
          title={errorState?.errorTitle || t('dataErrorTitle')}
          description={errorState?.errorDescription || t('dataErrorDescription')}
          footer={
            <ButtonFilled
              size={isMobile ? 'm' : 's'}
              label={errorState?.updateButtonLabel || t('updateWidget')}
              appearance='neutral'
              icon={<UpdateSVG />}
              onClick={errorState?.onClickUpdate}
            />
          }
        />
      );
    }

    case 'default':
    default: {
      return children;
    }
  }
}
