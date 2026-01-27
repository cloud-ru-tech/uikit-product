import cn from 'classnames';
import { PropsWithChildren } from 'react';

import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';

import { ActionsProps, Headline, HeadlineProps, MobileActions } from '../../helperComponents';
import styles from './styles.module.scss';

export type MobilePageCatalogProps = WithSupportProps<
  PropsWithChildren<
    Pick<HeadlineProps, 'title'> & {
      className?: string;
      actions?: ActionsProps['items'];
      maxVisibleActionsItems?: ActionsProps['maxVisibleItems'];
    }
  >
>;

export function MobilePageCatalog({
  children,
  title,
  actions = [],
  maxVisibleActionsItems,
  className,
  ...rest
}: MobilePageCatalogProps) {
  return (
    <div className={cn(styles.catalog, className)} {...extractSupportProps(rest)}>
      <Headline title={title} />

      {actions.length > 0 && <MobileActions items={actions} maxVisibleItems={maxVisibleActionsItems} />}

      <div className={styles.content}>{children}</div>
    </div>
  );
}
