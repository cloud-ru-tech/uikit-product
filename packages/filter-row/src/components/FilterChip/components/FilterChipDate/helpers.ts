import { InnerDate } from '../../../FilterDatePicker/helpers/types';

export const areDatesHasChanged = (oldDates: [InnerDate, InnerDate?], newDates: [InnerDate, InnerDate?]) => {
  const [oldStart, oldEnd] = oldDates;
  const [newStart, newEnd] = newDates;

  const areDatesHasChanged =
    oldStart?.toDateString() !== newStart?.toDateString() || oldEnd?.toDateString() !== newEnd?.toDateString();

  return areDatesHasChanged;
};
