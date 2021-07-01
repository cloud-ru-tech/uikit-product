import { LanguageCodeType } from '@sbercloud/uikit-react-localization';

export const TimeFormat = {
  [LanguageCodeType.enGB]: 'p',
  [LanguageCodeType.ruRU]: 'HH:mm',
};

export const AmPmFormat = {
  [LanguageCodeType.enGB]: true,
  [LanguageCodeType.ruRU]: false,
};

export const Separators = {
  [LanguageCodeType.ruRU]: {
    daySeparator: '.',
    timeSeparator: ', ',
  },
  [LanguageCodeType.enGB]: {
    daySeparator: '/',
    timeSeparator: <>&nbsp;</>,
  },
};

interface DateForFormat {
  day?: React.ReactNode;
  month?: React.ReactNode;
  year?: React.ReactNode;
  time?: React.ReactNode;
}

export const DateFormat = {
  [LanguageCodeType.ruRU]: (date: DateForFormat) => (
    <>
      {date.day}
      {Separators[LanguageCodeType.ruRU].daySeparator}
      {date.month}
      {Separators[LanguageCodeType.ruRU].daySeparator}
      {date.year}
      {(date.time && Separators[LanguageCodeType.ruRU].timeSeparator) || ''}
      {date.time || ''}
    </>
  ),
  [LanguageCodeType.enGB]: (date: DateForFormat) => (
    <>
      {date.month}
      {Separators[LanguageCodeType.enGB].daySeparator}
      {date.day}
      {Separators[LanguageCodeType.enGB].daySeparator}
      {date.year}
      {(date.time && Separators[LanguageCodeType.enGB].timeSeparator) || ''}
      {date.time || ''}
    </>
  ),
};

export enum Texts {
  specifyTime = 'specifyTime',
  incorrectDateEntered = 'incorrectDateEntered',
  day = 'day',
  month = 'month',
  year = 'year',
  time = 'time',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    specifyTime: 'Указать время',
    incorrectDateEntered: 'Введена некорректная дата',
    day: 'дд',
    month: 'мм',
    year: 'гггг',
    time: 'Время',
  },
  [LanguageCodeType.enGB]: {
    specifyTime: 'Specify the time',
    incorrectDateEntered: 'Incorrect date entered',
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
    time: 'Time',
  },
};

export function textProvider(language: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[language]?.[entity] || '';
}
