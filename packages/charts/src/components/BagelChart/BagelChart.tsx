import cn from 'classnames';
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

import { NumberFormatter } from '@sbercloud/uikit-product-localization';
import { error, extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { themeVars } from '@snack-uikit/figma-tokens';

import styles from './styles.module.scss';
import { getSegmentColor } from './utils';

export type BagelChartProps = WithSupportProps<{
  className: string;
  value: number;
  total: number;
  title?: React.ReactNode;
}>;

export function BagelChart({ value, total, title, className, ...rest }: BagelChartProps) {
  error('Value is too long', value > 9_999_999);
  error('Total is too long', total > 999_999_999);

  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)}>
      {title && <div className={styles.titleWrapper}>{title}</div>}

      <PieChart
        data={[{ value, color: getSegmentColor({ value, total }) }]}
        totalValue={total}
        background={themeVars.sys.neutral.decorDefault}
        startAngle={270}
        lineWidth={15}
        label={() => (
          <>
            <text className={styles.value} x={50} y={45}>
              <NumberFormatter value={value} />
            </text>
            <text className={styles.limit} x={50} y={65}>
              <NumberFormatter value={total} />
            </text>
          </>
        )}
        labelPosition={0}
      />
    </div>
  );
}
