import { COLORS } from './themes';

export function getSegmentColor({ value, total }: { value: number; total: number }) {
  const occupancyPercent = (value / total) * 100;
  let segmentColor = COLORS.svg.segment.green;

  if (occupancyPercent > 50 && occupancyPercent <= 75) {
    segmentColor = COLORS.svg.segment.yellow;
  } else if (occupancyPercent > 75) {
    segmentColor = COLORS.svg.segment.red;
  }

  return `var(${segmentColor})`;
}
