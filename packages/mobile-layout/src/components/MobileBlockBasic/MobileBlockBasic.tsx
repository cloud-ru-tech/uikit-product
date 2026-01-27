import cn from 'classnames';

import { BlockBasic, BlockBasicProps } from '@cloud-ru/uikit-product-layout';

import styles from './styles.module.scss';

export type MobileBlockBasicProps = BlockBasicProps;

export function MobileBlockBasic(props: MobileBlockBasicProps) {
  return <BlockBasic {...props} className={cn(styles.wrapper, props.className)} data-mobile />;
}
