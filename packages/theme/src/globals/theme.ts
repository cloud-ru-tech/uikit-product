import { BLUE_GREY, GREEN, GREY, PURPLE } from '../color/vars';

const GLOBAL_CSS_COLOR = {
  TEXT: '--general-text-color',
  BACKGROUND: '--general-background-color',
  BACKGROUND_ACCENT: '--general-background-accent-color',
  BACKGROUND_SECONDARY: '--general-background-secondary-color',
};

/* TODO: использовать [data-theme='${Themes.Purple}'] */
export const globalCSSTheme = `
    [data-theme='purple'] {
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[50]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_ACCENT}: var(${PURPLE[100]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY}: var(${GREY[0]});
    }
    [data-theme='purpleDark'] {
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[200]});
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_ACCENT}: var(${PURPLE[100]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY}: var(${GREY[800]});
    }
    [data-theme='green'] {
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[50]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_ACCENT}: var(${BLUE_GREY[80]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY}: var(${GREY[0]});
    }
    [data-theme='greenDark'] {
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[200]});
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_ACCENT}: var(${GREEN[125]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY}: var(${GREY[800]});
    }
  `;

export default GLOBAL_CSS_COLOR;
