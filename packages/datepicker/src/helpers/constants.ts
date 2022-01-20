import { LanguageCodeType } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from './texts-provider';

export const INPUT_PLACEHOLDER = (language: LanguageCodeType) => ({
  day: textProvider<string>(language, Texts.Day),
  month: textProvider<string>(language, Texts.Month),
  year: textProvider<string>(language, Texts.Year),
  time: '00:00',
});
