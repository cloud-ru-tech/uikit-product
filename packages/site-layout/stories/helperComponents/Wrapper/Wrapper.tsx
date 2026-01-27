import cn from 'classnames';
import { forwardRef, ReactNode } from 'react';

import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import styles from './styles.module.scss';

type WrapperProps = WithLayoutType<{
  children: ReactNode;
  className?: string;
}>;

export const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(({ children, className, layoutType }, ref) => (
  <div ref={ref} className={cn(styles.wrapper, className)} data-layout-type={layoutType}>
    {children}
  </div>
));
