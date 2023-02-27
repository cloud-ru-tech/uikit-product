import { SliderProps } from 'rc-slider';
import { MarkObj } from 'rc-slider/lib/Marks';

import { MarksPlacement } from './types';

export const getValueInRange = ({
  value: rawValue,
  min,
  max,
  marks,
  marksPlacementType,
}: {
  value: number;
  min: number;
  max: number;
  marks: SliderProps['marks'];
  marksPlacementType?: MarksPlacement;
}) => {
  const value =
    marksPlacementType === MarksPlacement.LinearOnlyMarks
      ? Number((marks?.[rawValue] as MarkObj)?.label) || rawValue
      : rawValue;

  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }

  return value;
};
