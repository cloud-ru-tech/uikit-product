import { LanguageCodeType } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from './texts-provider';

export const INPUT_PLACEHOLDER = (language: LanguageCodeType) => ({
  day: textProvider<string>(language, Texts.Day),
  month: textProvider<string>(language, Texts.Month),
  year: textProvider<string>(language, Texts.Year),
  time: '00:00',
});
