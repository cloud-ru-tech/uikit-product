import cn from 'classnames';
import { useMemo } from 'react';

import { extractSupportProps } from '@cloud-ru/uikit-product-utils';

import { getColumnsStyles } from '../helpers';
import styles from './styles.module.scss';
import { GridProps } from './types';

export function Grid({ children, columnsConfig, gap = 'm', layoutType, className, ...rest }: GridProps) {
  const columnsStyles = useMemo(() => getColumnsStyles({ columnsConfig, layoutType }), [columnsConfig, layoutType]);

  return (
    <div
      className={cn(styles.grid, className)}
      {...extractSupportProps(rest)}
      style={columnsStyles}
      data-gap={gap}
      data-layout-type={layoutType}
    >
      {children}
    </div>
  );
}
