import endOfDay from 'date-fns/endOfDay';
import isAfter from 'date-fns/isAfter';
import subDays from 'date-fns/subDays';

export const isAfterMinDate = (minDate: Date, date: Date): boolean =>
  minDate && date && isAfter(date, endOfDay(subDays(minDate, 1)));
