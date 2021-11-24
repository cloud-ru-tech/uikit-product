import { ScaleLinear } from 'd3-scale';

import { COLOR_VARS } from '../themes';
import { HeatMapChartStyles } from '../types';
import { TICKS_SIZE } from './constants';

export const getStyles = (colorScale: ScaleLinear<string, string>, data: number[][]): HeatMapChartStyles => ({
  cellStyle: (x: number, y: number) => ({
    backgroundColor: colorScale(data[x][y]),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    padding: '4px',
    borderColor: `var(${COLOR_VARS.BACKGROUND})`,
  }),
  xLabelsStyle: () => ({
    fontSize: '12px',
    lineHeight: '10px',
    fontWeight: 400,
    marginTop: '12px',
    color: `var(${COLOR_VARS.LABEL})`,
    padding: 0,
    height: `${TICKS_SIZE - 12}px`,
  }),
  yLabelsStyle: () => ({
    width: `${TICKS_SIZE - 8}px`,
    fontSize: '12px',
    marginRight: '8px',
    padding: '0',
    color: `var(${COLOR_VARS.LABEL})`,
  }),
});
