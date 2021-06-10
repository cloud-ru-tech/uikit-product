import format from 'date-fns/format';

import { INPUT_PLACEHOLDER } from './constants';
import { TSplitDateType } from './types';

export const getSplitDate = (date?: Date | null, isPickTime?: boolean): TSplitDateType => {
  if (!date) return INPUT_PLACEHOLDER;
  const dateObj = new Date(date);
  const isDate = !isNaN(dateObj.getTime());
  if (!isDate) return INPUT_PLACEHOLDER;

  return {
    day: format(dateObj, 'dd'),
    month: format(dateObj, 'MM'),
    year: format(dateObj, 'yyyy'),
    time: format(dateObj, 'HH:mm'),
    full: format(dateObj, isPickTime ? 'dd.MM.yyyy, HH:mm' : 'dd.MM.yyyy'),
  };
};
