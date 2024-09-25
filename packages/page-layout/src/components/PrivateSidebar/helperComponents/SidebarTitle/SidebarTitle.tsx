import cn from 'classnames';
import { ReactNode } from 'react';

import { IconPredefined } from '@snack-uikit/icon-predefined';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { Icon } from '../../types';
import styles from './styles.module.scss';

export type SidebarTitleProps = {
  title: string;
  icon: Icon;
  className?: string;
  afterContent?: ReactNode;
};

export function SidebarTitle({ title, className, icon, afterContent }: SidebarTitleProps) {
  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.icon}>
        <IconPredefined appearance='neutral' size='s' shape='square' icon={icon} />
      </div>
      <div className={styles.title}>
        <Typography.SansLabelL>
          <TruncateString text={title} />
        </Typography.SansLabelL>
      </div>
      {afterContent}
    </div>
  );
}
