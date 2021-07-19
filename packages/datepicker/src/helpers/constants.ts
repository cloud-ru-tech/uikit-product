import { LanguageCodeType } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from './texts-provider';

export const INPUT_PLACEHOLDER = (language: LanguageCodeType) => ({
  day: textProvider(language, Texts.day),
  month: textProvider(language, Texts.month),
  year: textProvider(language, Texts.year),
  time: '00:00',
});
