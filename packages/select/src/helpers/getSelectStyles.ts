import { Styles, Theme } from 'react-select';

import { styles as colorStyles } from '../styles/color';
import { styles as largeStyles, theme as largeTheme } from '../styles/large';
import { styles as mediumStyles, theme as mediumTheme } from '../styles/medium';
import { styles as roundGrayStyles, theme as roundGrayTheme } from '../styles/roundGray';
import { styles as roundLightStyles, theme as roundLightTheme } from '../styles/roundLight';
import { styles as tagStyles } from '../styles/tag';
import { styles as withLogoStyles, theme as withLogoTheme } from '../styles/withLogo';
import { SELECT_TYPES } from './types';

const themes = {
  [SELECT_TYPES.ROUND_LIGHT]: roundLightTheme,
  [SELECT_TYPES.ROUND_GRAY]: roundGrayTheme,
  [SELECT_TYPES.MEDIUM]: mediumTheme,
  [SELECT_TYPES.LARGE]: largeTheme,
  [SELECT_TYPES.WITH_LOGO]: withLogoTheme,
};

const getTheme = (type?: string): themeFn => (type ? themes[type] : mediumTheme);

const styles = {
  [SELECT_TYPES.ROUND_LIGHT]: roundLightStyles,
  [SELECT_TYPES.ROUND_GRAY]: roundGrayStyles,
  [SELECT_TYPES.MEDIUM]: mediumStyles,
  [SELECT_TYPES.LARGE]: largeStyles,
  [SELECT_TYPES.WITH_LOGO]: withLogoStyles,
  [SELECT_TYPES.COLOR]: colorStyles,
  [SELECT_TYPES.TAG]: tagStyles,
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore*/
const getCustomStyles = (type?: string): Styles => (type ? styles[type] : mediumStyles);

type themeFn = (theme: Theme) => Theme;

interface ICustomStyles {
  theme: themeFn;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore*/
  styles: Styles;
}

export default (type?: string): ICustomStyles => ({
  theme: getTheme(type),
  styles: getCustomStyles(type),
});
