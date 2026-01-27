import { Brand, LanguageCodeType, Themes } from '../types';

export const DEFAULT = {
  LANGUAGE: LanguageCodeType.ruRU,
  BRAND: Brand.Cloud,
  THEME: Themes.Green,
};

export enum POST_MESSAGE_KEY {
  changeTheme = 'changeTheme',
  changeThemeDone = 'changeThemeDone',
  changeBrand = 'changeBrand',
  changeBrandDone = 'changeBrandDone',
  changeLanguage = 'changeLanguage',
  changeLanguageDone = 'changeLanguageDone',
}
