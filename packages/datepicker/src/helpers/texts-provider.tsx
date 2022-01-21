import { ReactNode } from 'react';

import { LanguageCodeType, createTextProvider } from '@sbercloud/uikit-utils';

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

export enum Texts {
  SpecifyTime = 'specifyTime',
  IncorrectDateEntered = 'incorrectDateEntered',
  Day = 'day',
  Month = 'month',
  Year = 'year',
  Time = 'time',
  Prev = 'prev',
  Next = 'next',
  DateFormat = 'dateFormat',
}

export type DictionaryPropertyAsFn = (date: DateForFormat) => ReactNode;
type DictionaryProperty = string | DictionaryPropertyAsFn;

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, DictionaryProperty>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.SpecifyTime]: 'Указать время',
    [Texts.IncorrectDateEntered]: 'Введена некорректная дата',
    [Texts.Day]: 'дд',
    [Texts.Month]: 'мм',
    [Texts.Year]: 'гггг',
    [Texts.Time]: 'Время',
    [Texts.Prev]: 'Предыдущий',
    [Texts.Next]: 'Следующий',
    [Texts.DateFormat]: (date: DateForFormat) => (
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
  },
  [LanguageCodeType.enGB]: {
    [Texts.SpecifyTime]: 'Specify time',
    [Texts.IncorrectDateEntered]: 'Incorrect date',
    [Texts.Day]: 'dd',
    [Texts.Month]: 'mm',
    [Texts.Year]: 'yyyy',
    [Texts.Time]: 'Time',
    [Texts.Prev]: 'Previous',
    [Texts.Next]: 'Next',
    [Texts.DateFormat]: (date: DateForFormat) => (
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
  },
};

export const textProvider = createTextProvider<Texts, DictionaryProperty>(Dictionary, 'datepicker');
