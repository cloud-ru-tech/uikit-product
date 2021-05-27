import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import ruLocale from 'date-fns/locale/ru';

import { TableBasicTypes } from '../../helpers/types';

const INVALID_DATE = 'Invalid date/time format';

const formatter = (date: Date, dateFormat: string): string => {
  let res = null;
  try {
    res = format(date, dateFormat, { locale: ruLocale });
  } catch (error) {
    res = INVALID_DATE;
  }

  return res;
};

const dateFormat = (date: string | Date): string => {
  const utcDate = typeof date === 'string' && date.replace(/\+[\d:]+$/, '');
  const dateFormat = (utcDate && !/\w+Z$/.test(utcDate) && `${utcDate}Z`) || utcDate;
  const dateObj = new Date(dateFormat as string);
  const isDate = isNaN(dateObj.getTime());
  if (isDate) return INVALID_DATE;

  const dateStr = formatter(dateObj, 'dd MMM yyyy')?.replace(/\./, '');
  const timeStr = formatter(dateObj, 'HH:mm');

  return isToday(dateObj) ? timeStr : `${dateStr}${dateStr && timeStr ? ', ' : ''}${timeStr}`;
};

export const dateFormatter = ({
  value,
  prefix,
}: Partial<TableBasicTypes.ValueFormatterParams> & {
  prefix?: string;
}): string => (value ? `${prefix || ''}${dateFormat(value)}` : '—');
