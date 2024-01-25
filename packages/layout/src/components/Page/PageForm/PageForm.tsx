import cn from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';

import { BlockBasic } from '../../BlockBasic';
import { Headline, HeadlineProps } from '../Headline';
import styles from './styles.module.scss';

export type PageFormProps = PropsWithChildren<
  Pick<HeadlineProps, 'title'> & {
    prefix?: ReactNode;
    className?: string;
  }
>;

export function PageForm({ children, title, className, prefix }: PageFormProps) {
  return (
    <div className={cn(styles.container, className)}>
      <BlockBasic className={styles.form}>
        <div>
          <div className={styles.prefix}>{prefix}</div>
          <Headline title={title} />
        </div>
        <div>{children}</div>
      </BlockBasic>
    </div>
  );
}
