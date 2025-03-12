import { PropsWithChildren } from 'react';

import { RepeatSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonFunction } from '@snack-uikit/button';
import { Sun } from '@snack-uikit/loaders';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type ContentBlockProps = {
  loading?: boolean;
  dataError?: boolean;
  onRetry?(): void;
};

export function ContentBlock({ loading, dataError, onRetry, children }: PropsWithChildren<ContentBlockProps>) {
  const { t } = useLocale('PriceSummary');

  if (loading) {
    return (
      <div className={styles.loadingBlock}>
        <Sun />
      </div>
    );
  }

  if (dataError) {
    return (
      <div className={styles.dataErrorBlock}>
        {onRetry && <ButtonFunction icon={<RepeatSVG />} onClick={onRetry} />}

        <Typography.SansBodyS>{t('dataError')}</Typography.SansBodyS>
      </div>
    );
  }

  return children;
}
