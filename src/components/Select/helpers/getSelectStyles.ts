import { Theme, Styles } from 'react-select';

import {
  theme as roundLightTheme,
  styles as roundLightStyles,
} from 'components/Select/styles/roundLight';
import {
  theme as roundGrayTheme,
  styles as roundGrayStyles,
} from 'components/Select/styles/roundGray';
import {
  theme as mediumTheme,
  styles as mediumStyles,
} from 'components/Select/styles/medium';
import {
  theme as largeTheme,
  styles as largeStyles,
} from 'components/Select/styles/large';
import {
  theme as withLogoTheme,
  styles as withLogoStyles,
} from 'components/Select/styles/withLogo';
import { styles as colorStyles } from 'components/Select/styles/color';
import { styles as tagStyles } from 'components/Select/styles/tag';
import { SELECT_TYPES } from 'components/Select/helpers/types';

const themes = {
  [SELECT_TYPES.ROUND_LIGHT]: roundLightTheme,
  [SELECT_TYPES.ROUND_GRAY]: roundGrayTheme,
  [SELECT_TYPES.MEDIUM]: mediumTheme,
  [SELECT_TYPES.LARGE]: largeTheme,
  [SELECT_TYPES.WITH_LOGO]: withLogoTheme,
};

const getTheme = (type?: string): themeFn => {
  const theme = type ? themes[type] : mediumTheme;

  return theme;
};

const styles = {
  [SELECT_TYPES.ROUND_LIGHT]: roundLightStyles,
  [SELECT_TYPES.ROUND_GRAY]: roundGrayStyles,
  [SELECT_TYPES.MEDIUM]: mediumStyles,
  [SELECT_TYPES.LARGE]: largeStyles,
  [SELECT_TYPES.WITH_LOGO]: withLogoStyles,
  [SELECT_TYPES.COLOR]: colorStyles,
  [SELECT_TYPES.TAG]: tagStyles,
};

const getCustomStyles = (type?: string): Styles => {
  const style = type ? styles[type] : mediumStyles;

  return style;
};

type themeFn = (theme: Theme) => Theme;

interface ICustomStyles {
  theme: themeFn;
  styles: Styles;
}

export default (type?: string): ICustomStyles => ({
  theme: getTheme(type),
  styles: getCustomStyles(type),
});
