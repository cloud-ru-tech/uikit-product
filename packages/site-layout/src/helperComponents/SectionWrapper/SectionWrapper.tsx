import cn from 'classnames';
import { forwardRef, ReactNode } from 'react';

import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type SectionWrapperProps = WithSupportProps<
  WithLayoutType<{
    children: ReactNode;
    className?: string;
  }>
>;

export const SectionWrapper = forwardRef<HTMLDivElement, SectionWrapperProps>(
  ({ children, className, layoutType, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(styles.sectionWrapper, className)}
      data-layout-type={layoutType}
      {...extractSupportProps(rest)}
    >
      <div className={styles.contentWrapper} data-layout-type={layoutType}>
        {children}
      </div>
    </div>
  ),
);
