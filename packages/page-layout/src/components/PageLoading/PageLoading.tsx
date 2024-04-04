import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Spinner as UISpinner } from '@snack-uikit/loaders';

import styles from './styles.module.scss';

export type PageLoadingProps = WithSupportProps<{
  className?: string;
}>;

export function PageLoading({ className, ...rest }: PageLoadingProps) {
  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)}>
      <UISpinner size='m' className={styles.spinner} />
    </div>
  );
}
