import { isValid } from 'date-fns';

import { DEFAULT_DATE_FORMAT } from './constants';
import { parseDateString } from './parseDateString';

export const isValidDateString = (date: string | undefined) =>
  date && date.length === DEFAULT_DATE_FORMAT.length && isValid(parseDateString(date));
