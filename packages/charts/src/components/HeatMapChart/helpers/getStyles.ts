import { ScaleLinear } from 'd3-scale';

import { themeVars } from '@snack-uikit/figma-tokens';

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
    borderColor: themeVars.sys.neutral.background1Level,
  }),
  xLabelsStyle: () => ({
    fontSize: '12px',
    lineHeight: '10px',
    fontWeight: 400,
    marginTop: '12px',
    color: themeVars.sys.neutral.textSupport,
    padding: 0,
    height: `${TICKS_SIZE - 12}px`,
  }),
  yLabelsStyle: () => ({
    width: `${TICKS_SIZE - 8}px`,
    fontSize: '12px',
    marginRight: '8px',
    padding: '0',
    color: themeVars.sys.neutral.textSupport,
  }),
});
