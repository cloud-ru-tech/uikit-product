import { LanguageCodeType } from '@sbercloud/uikit-react-localization';
import memoize from 'memoizee';

import { INPUT_PLACEHOLDER } from './constants';
import { AmPmFormat } from './texts-provider';
import { TSplitDateType } from './types';

const getFormatter = (language: LanguageCodeType, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(language, options);

const mGetFormatter = memoize(getFormatter);

export const getSplitDate = (language: LanguageCodeType, date?: Date | null): TSplitDateType => {
  const inputPlaceholder = INPUT_PLACEHOLDER(language);
  if (!date) return inputPlaceholder;
  const dateObj = new Date(date);
  const isDate = !isNaN(dateObj.getTime());
  if (!isDate) return inputPlaceholder;

  return {
    day: mGetFormatter(language, { day: '2-digit' }).format(dateObj),
    month: mGetFormatter(language, { month: '2-digit' }).format(dateObj),
    year: mGetFormatter(language, { year: 'numeric' }).format(dateObj),
    time: mGetFormatter(language, { hour12: AmPmFormat[language], hour: '2-digit', minute: '2-digit' }).format(dateObj),
  };
};
