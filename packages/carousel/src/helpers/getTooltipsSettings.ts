import { TooltipsSettings } from '../types';

export const getTooltipsSettings = (tooltips: TooltipsSettings | undefined, placement: string) => {
  const tooltipsSettings = {};
  const { tooltipContent, disabledTooltipContent } = tooltips || {};

  if (tooltipContent) {
    tooltipsSettings['tooltip'] = { content: tooltipContent, placement };
  }

  if (disabledTooltipContent) {
    tooltipsSettings['disabledTooltip'] = { content: disabledTooltipContent, placement };
  }
  return tooltipsSettings;
};
