import { BLACK_ALFA, BLUE_GREY, GREEN, GREY, PURPLE, WHITE_ALFA } from '../color/vars';
import { Themes } from '../types/theme';

export const GLOBAL_CSS_COLOR = {
  TEXT: '--general-text-color',
  BACKGROUND: '--general-background-color',
  BACKGROUND_ACCENT: '--general-background-accent-color',
  BACKGROUND_SECONDARY: '--general-background-secondary-color',
  BACKGROUND_DARK: '--general-background-dark-color',
  NAVIGATION_BACKGROUND: '--general__navigation__background__default',
  NAVIGATION_BORDER: '--general__navigation__border__default',
};

export const globalCSSTheme = `
    body[data-theme='${Themes.Purple}'] {
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[50]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_ACCENT}: var(${PURPLE[100]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_DARK}: var(${BLUE_GREY[90]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY}: var(${GREY[0]});
      ${GLOBAL_CSS_COLOR.NAVIGATION_BACKGROUND}: var(${BLUE_GREY[5]});
      ${GLOBAL_CSS_COLOR.NAVIGATION_BORDER}: var(${BLACK_ALFA[8]});
    }
    body[data-theme='${Themes.PurpleDark}'] {
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[200]});
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_ACCENT}: var(${PURPLE[100]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_DARK}: var(${BLUE_GREY[80]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.NAVIGATION_BACKGROUND}: var(${GREY[900]});
      ${GLOBAL_CSS_COLOR.NAVIGATION_BORDER}: var(${WHITE_ALFA[16]});
    }
    body[data-theme='${Themes.Green}'] {
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[50]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_ACCENT}: var(${BLUE_GREY[80]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_DARK}: var(${BLUE_GREY[90]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY}: var(${GREY[0]});
      ${GLOBAL_CSS_COLOR.NAVIGATION_BACKGROUND}: var(${BLUE_GREY[5]});
      ${GLOBAL_CSS_COLOR.NAVIGATION_BORDER}: var(${BLACK_ALFA[8]});
    }
    body[data-theme='${Themes.GreenDark}'] {
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[200]});
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_ACCENT}: var(${GREEN[125]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_DARK}: var(${BLUE_GREY[80]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.NAVIGATION_BACKGROUND}: var(${GREY[900]});
      ${GLOBAL_CSS_COLOR.NAVIGATION_BORDER}: var(${WHITE_ALFA[16]});
    }
`;
