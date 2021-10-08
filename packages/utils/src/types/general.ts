import { LanguageCodeType } from './language';
import { Themes } from './theme';

export interface WindowStore {
  sbercloudUIKit: { languageCode?: LanguageCodeType; theme?: Themes };
}
