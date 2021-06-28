export enum Languages {
  En = 'en-GB',
  Ru = 'ru-RU',
}

export const TimeFormat = {
  [Languages.En]: 'p',
  [Languages.Ru]: 'HH:mm',
};

export const AmPmFormat = {
  [Languages.En]: true,
  [Languages.Ru]: false,
};

export const Separators = {
  [Languages.Ru]: {
    daySeparator: '.',
    timeSeparator: ', ',
  },
  [Languages.En]: {
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
  [Languages.Ru]: (date: DateForFormat) => (
    <>
      {date.day}
      {Separators[Languages.Ru].daySeparator}
      {date.month}
      {Separators[Languages.Ru].daySeparator}
      {date.year}
      {(date.time && Separators[Languages.Ru].timeSeparator) || ''}
      {date.time || ''}
    </>
  ),
  [Languages.En]: (date: DateForFormat) => (
    <>
      {date.month}
      {Separators[Languages.En].daySeparator}
      {date.day}
      {Separators[Languages.En].daySeparator}
      {date.year}
      {(date.time && Separators[Languages.En].timeSeparator) || ''}
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

const Dictionary: Record<Languages, Record<Texts, string>> = {
  [Languages.Ru]: {
    specifyTime: 'Указать время',
    incorrectDateEntered: 'Введена некорректная дата',
    day: 'дд',
    month: 'мм',
    year: 'гггг',
    time: 'Время',
  },
  [Languages.En]: {
    specifyTime: 'Specify the time',
    incorrectDateEntered: 'Incorrect date entered',
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
    time: 'Time',
  },
};

export function textProvider(language: Languages, entity: Texts): string {
  return Dictionary[language][entity];
}
