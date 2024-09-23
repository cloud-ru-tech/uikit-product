import cn from 'classnames';
import React, { PropsWithChildren } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import {
  Actions,
  ActionsProps,
  Headline,
  HeadlineProps,
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
  ...rest
}: MobilePageServicesProps) {
  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)}>
      <Headline title={title} beforeHeadline={beforeHeadline} afterHeadline={afterHeadline} subHeader={subHeader} />

      {sidebar && <SidebarSelect {...sidebar} />}

      {actions.length > 0 && <Actions items={actions} />}

      <div className={styles.childWrapper}>{children}</div>
    </div>
  );
}
