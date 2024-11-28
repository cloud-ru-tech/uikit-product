import { LanguageCodeType } from './language';
import { Brand, Themes } from './theme';

export type WindowStore = {
  sbercloudUIKit: {
    languageCode: LanguageCodeType;
    theme: Themes;
    brand: Brand;
  };
};
