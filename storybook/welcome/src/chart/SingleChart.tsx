import { PieChart } from 'react-minimal-pie-chart';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import styles from '../styles.module.scss';
import { SingleChartProps } from '../types';

export function SingleChart(props: SingleChartProps) {
  return (
    <div className={styles.wrapper} style={{ '--height': props.height + '%' }}>
      <h3 className={styles.singleTitle}>{props.title}</h3>
      <PieChart
        data={[{ value: props.value, color: themeVars.sys.primary.accentDefault }]}
        totalValue={props.total}
        lineWidth={20}
        label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          fontSize: '24px',
          fontFamily: 'sans-serif',
          fill: themeVars.sys.neutral.textSupport,
        }}
        labelPosition={0}
      />
    </div>
  );
}
