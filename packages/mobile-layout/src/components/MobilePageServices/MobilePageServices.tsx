import cn from 'classnames';
import { PropsWithChildren } from 'react';

import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';

import {
  ActionsProps,
  Headline,
  HeadlineProps,
  MobileActions,
  SidebarSelect,
  SidebarSelectProps,
} from '../../helperComponents';
import styles from './styles.module.scss';

export type MobilePageServicesProps = WithSupportProps<
  PropsWithChildren<
    Pick<HeadlineProps, 'title' | 'beforeHeadline' | 'subHeader' | 'afterHeadline'> & {
      className?: string;
      sidebar?: SidebarSelectProps;
      actions?: ActionsProps['items'];
      maxVisibleActionsItems?: ActionsProps['maxVisibleItems'];
    }
  >
>;

export function MobilePageServices({
  children,
  title,
  actions = [],
  className,
  sidebar,
  afterHeadline,
  subHeader,
  beforeHeadline,
  maxVisibleActionsItems,
  ...rest
}: MobilePageServicesProps) {
  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)}>
      <Headline title={title} beforeHeadline={beforeHeadline} afterHeadline={afterHeadline} subHeader={subHeader} />

      {sidebar && <SidebarSelect {...sidebar} />}

      {actions.length > 0 && <MobileActions items={actions} maxVisibleItems={maxVisibleActionsItems} />}

      <div className={styles.childWrapper}>{children}</div>
    </div>
  );
}
