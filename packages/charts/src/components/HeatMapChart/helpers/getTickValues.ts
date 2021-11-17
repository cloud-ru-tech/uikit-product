import range from 'lodash.range';

import { HeatMapChartOptions } from '../types';
import { DEFAULT_LEGEND_TICKS_NUM } from './constants';

/**
 * Returns a "nice" number approximately equal to range Rounds
 * the number if round = true Takes the ceiling if round = false.
 *
 * @param range the data range
 * @param round whether to round the result
 * @return a "nice" number to be used for the data range
 */
const niceNum = (range: number, round: boolean): number => {
  let niceFraction: number;

  const exponent = Math.floor(Math.log10(range));
  const fraction = range / Math.pow(10, exponent);

  if (round) {
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
  } else {
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;
  }

  return niceFraction * Math.pow(10, exponent);
};

/**
 * Calculate and update values for tick spacing and nice
 * minimum and maximum data points on the axis.
 */
const calculateTicks = (maxTicks: number, minPoint: number, maxPoint: number): [number, number, number] => {
  const range = niceNum(maxPoint - minPoint, false);
  const tickSpacing = niceNum(range / (maxTicks - 1), true);
  const niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing;
  const niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing;
  return [tickSpacing, niceMin, niceMax];
};

export const getTickValues = (domain: HeatMapChartOptions['domain']): string[] => {
  const [min, max] = domain;
  const [tickSpacing, niceMin, niceMax] = calculateTicks(DEFAULT_LEGEND_TICKS_NUM, min, max);

  const rangeValues = range(niceMin, niceMax, tickSpacing).filter(v => (v > 1 ? Math.floor(v) > min : v > min));
  return [...new Set([min, ...rangeValues, max])].map(value =>
    value === 0 ? '0' : value < 1 ? value.toFixed(1) : String(Math.floor(value)),
  );
};
