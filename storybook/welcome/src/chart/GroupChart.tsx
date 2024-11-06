import { PieChart, pieChartDefaultProps } from 'react-minimal-pie-chart';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import styles from '../styles.module.scss';
import { DefaultChartProps } from '../types';

export function GroupChart(props: DefaultChartProps) {
  return (
    <div className={styles.wrapper} style={{ '--height': props.height + '%' }}>
      <h3 className={styles.groupTitle}>{props.title}</h3>
      <PieChart
        data={props?.data}
        radius={pieChartDefaultProps.radius - 14}
        lineWidth={60}
        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
        segmentsShift={1}
        paddingAngle={2}
        animate
        label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}`}
        labelPosition={112}
        labelStyle={{
          fontSize: '4px',
          fill: themeVars.sys.neutral.textSupport,
          opacity: 0.75,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
