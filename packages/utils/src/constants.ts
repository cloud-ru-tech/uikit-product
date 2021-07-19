import { LanguageCodeType, Themes } from './types';
import { purple, purpleDark, green, greenDark } from '@sbercloud/uikit-theme';

export const DEFAULT = { LANGUAGE: window.navigator.language as LanguageCodeType, THEME: Themes.Purple };

export const DEPRECATED_COLOR = {
  [Themes.Purple]: purple,
  [Themes.PurpleDark]: purpleDark,
  [Themes.Green]: green,
  [Themes.GreenDark]: greenDark,
};

export enum POSTMASSAGE_KEY {
  changeTheme = 'changeTheme',
  changeThemeDone = 'changeThemeDone',
  changeLanguage = 'changeLanguage',
  changeLanguageDone = 'changeLanguageDone',
}
