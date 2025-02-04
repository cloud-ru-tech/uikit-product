import cn from 'classnames';
import { forwardRef, ReactNode } from 'react';

import {
  extractDataProps,
  extractSupportProps,
  WithLayoutType,
  WithSupportProps,
} from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type SectionWrapperProps = WithSupportProps<
  WithLayoutType<{
    children: ReactNode;
    className?: string;
  }>
>;

export const SectionWrapper = forwardRef<HTMLDivElement, SectionWrapperProps>(
  ({ children, className, layoutType, ...rest }, ref) => (
    <section
      ref={ref}
      className={cn(styles.sectionWrapper, className)}
      data-layout-type={layoutType}
      {...extractSupportProps(rest)}
      {...extractDataProps(rest)}
    >
      <div className={styles.contentWrapper} data-layout-type={layoutType}>
        {children}
      </div>
    </section>
  ),
);
