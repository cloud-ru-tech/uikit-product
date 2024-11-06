import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

export function getSegmentColor({ value, total }: { value: number; total: number }) {
  const occupancyPercent = (value / total) * 100;
  let segmentColor = themeVars.sys.green.accentDefault;

  if (occupancyPercent > 50 && occupancyPercent <= 75) {
    segmentColor = themeVars.sys.yellow.accentDefault;
  } else if (occupancyPercent > 75) {
    segmentColor = themeVars.sys.red.accentDefault;
  }

  return segmentColor;
}
