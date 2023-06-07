import { parse } from 'date-fns';

import { DEFAULT_DATE_FORMAT } from './constants';

export const parseDateString = (date: string | undefined) =>
  date ? parse(date, DEFAULT_DATE_FORMAT, new Date()) : undefined;
