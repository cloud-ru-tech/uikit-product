import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  Russia = 'Russia',
  Belarus = 'Belarus',
  Kazakhstan = 'Kazakhstan',
  Armenia = 'Armenia',
  Kyrgyzstan = 'Kyrgyzstan',
  Uzbekistan = 'Uzbekistan',
  Azerbaijan = 'Azerbaijan',
  Tajikistan = 'Tajikistan',
  Georgia = 'Georgia',
}

const dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Russia]: 'Россия',
    [Texts.Belarus]: 'Беларусь',
    [Texts.Kazakhstan]: 'Казахстан',
    [Texts.Armenia]: 'Армения',
    [Texts.Kyrgyzstan]: 'Киргизстан',
    [Texts.Uzbekistan]: 'Узбекистан',
    [Texts.Azerbaijan]: 'Азербайджан',
    [Texts.Tajikistan]: 'Таджикистан',
    [Texts.Georgia]: 'Грузия',
  },
  [LanguageCodeType.enGB]: Texts,
};

export const textProvider = createTextProvider<Texts>(dictionary, 'field-phone');
