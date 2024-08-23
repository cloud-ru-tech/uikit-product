import { LanguageCodeType, Themes } from './types';

export const DEFAULT = { LANGUAGE: LanguageCodeType.ruRU, THEME: Themes.Purple };

export enum POST_MESSAGE_KEY {
  changeTheme = 'changeTheme',
  changeThemeDone = 'changeThemeDone',
  changeLanguage = 'changeLanguage',
  changeLanguageDone = 'changeLanguageDone',
}
