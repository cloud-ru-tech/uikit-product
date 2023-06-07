import {
  addYears,
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfToday,
  endOfYear,
  format,
  getMonth,
  getYear,
  startOfToday,
  startOfYear,
  subYears,
} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import capitalizeFirstLetter from 'lodash.capitalize';

export const MONTHS = eachMonthOfInterval({
  start: startOfYear(startOfToday()),
  end: endOfYear(endOfToday()),
}).map(date => ({
  value: getMonth(date),
  title: capitalizeFirstLetter(format(date, 'LLLL', { locale: ruLocale })),
}));

export const CURRENT_MONTH = {
  title: format(startOfToday(), 'LLLL'),
  value: startOfToday().getMonth(),
};

export const getMonthOption = (date: Date) => ({
  value: getMonth(date),
  title: capitalizeFirstLetter(format(date, 'LLLL', { locale: ruLocale })),
});

export const YEARS = eachYearOfInterval({
  start: subYears(startOfToday(), 5),
  end: addYears(startOfToday(), 5),
}).map(year => getYear(year));
