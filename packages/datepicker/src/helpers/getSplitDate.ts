import { LanguageCodeType } from '@sbercloud/uikit-product-utils';

import { INPUT_PLACEHOLDER } from './constants';
import { AmPmFormat } from './texts-provider';
import { TSplitDateType } from './types';

const getFormatter = (language: LanguageCodeType, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(language, options);

export const getSplitDate = (language: LanguageCodeType, date?: Date | null): TSplitDateType => {
  const inputPlaceholder = INPUT_PLACEHOLDER(language);
  if (!date) return inputPlaceholder;
  const dateObj = new Date(date);
  const isDate = !isNaN(dateObj.getTime());
  if (!isDate) return inputPlaceholder;

  return {
    day: getFormatter(language, { day: '2-digit' }).format(dateObj),
    month: getFormatter(language, { month: '2-digit' }).format(dateObj),
    year: getFormatter(language, { year: 'numeric' }).format(dateObj),
    time: getFormatter(language, {
      hourCycle: AmPmFormat[language] ? 'h12' : 'h23',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj),
  };
};
