import cn from 'classnames';
import { HTMLProps } from 'react';

import styles from './styles.module.scss';

export type BlockBasicProps = HTMLProps<HTMLDivElement>;

export function BlockBasic({ className = '', ...rest }: BlockBasicProps) {
  return <div {...rest} className={cn(styles.container, className)} />;
}
