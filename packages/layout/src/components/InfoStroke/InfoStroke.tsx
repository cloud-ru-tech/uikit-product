import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Divider } from '@snack-uikit/divider';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type InfoStrokeProps = WithSupportProps<{
  label: ReactNode;
  value: ReactNode;
  topDivider?: boolean;
  bottomDivider?: boolean;
  className?: string;
}>;

export function InfoStroke({
  label,
  value,
  topDivider = false,
  bottomDivider = false,
  className,
  ...rest
}: InfoStrokeProps) {
  return (
    <div {...extractSupportProps(rest)} className={cn(styles.fieldWrapper, className)}>
      {topDivider && <Divider weight='light' />}
      <div className={styles.field}>
        <Typography.SansLabelL className={styles.label}>{label}</Typography.SansLabelL>
        <Typography.SansBodyM className={styles.value}>{value}</Typography.SansBodyM>
      </div>
      {bottomDivider && <Divider weight='light' />}
    </div>
  );
}
