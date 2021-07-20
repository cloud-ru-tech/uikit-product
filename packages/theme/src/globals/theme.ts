import { BLUE_GREY, GREEN, GREY, PURPLE } from '../color/vars';

const GLOBAL_CSS_COLOR = {
  BACKGROUND: '--general-background-color',
  TEXT: '--general-text-color',
  ACCENT_BACKGROUND: '--general-background-accent',
};

/* TODO: использовать [data-theme='${Themes.Purple}'] */
export const globalCSSTheme = `
    [data-theme='purple'] {
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[50]});
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.ACCENT_BACKGROUND}: var(${PURPLE[100]});
    }
    [data-theme='purpleDark'] {
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[900]});
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[200]});
      ${GLOBAL_CSS_COLOR.ACCENT_BACKGROUND}: var(${PURPLE[100]});
    }
    [data-theme='green'] {
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[50]});
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.ACCENT_BACKGROUND}: var(${BLUE_GREY[80]});
    }
    [data-theme='greenDark'] {
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[900]});
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[200]});
      ${GLOBAL_CSS_COLOR.ACCENT_BACKGROUND}: var(${GREEN[125]});
    }
  `;

export default GLOBAL_CSS_COLOR;
