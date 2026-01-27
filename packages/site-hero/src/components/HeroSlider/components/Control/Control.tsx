import cn from 'classnames';
import { forwardRef } from 'react';

import { ChevronLeftSVG } from '@cloud-ru/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';

import styles from './styles.module.scss';

type ControlProps = WithSupportProps<{
  onClick?(): void;
  variant: 'prev' | 'next';
  className?: string;
}>;

export const Control = forwardRef<HTMLButtonElement, ControlProps>(
  ({ onClick, variant, className, ...rest }: ControlProps, ref) => (
    <button
      ref={ref}
      className={cn(styles.control, className)}
      onClick={onClick}
      type='button'
      data-variant={variant}
      {...extractSupportProps(rest)}
    >
      <ChevronLeftSVG size={24} className={styles.icon} />
    </button>
  ),
);
