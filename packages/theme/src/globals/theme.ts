import { GREY } from '../color/vars';

const GLOBAL_CSS_COLOR = {
  BACKGROUND: '--general-background-color',
  TEXT: '--general-text-color',
};

export const globalCSSTheme = `
    [data-theme='purple'] {
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[50]});
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[800]});
    }
    [data-theme='purpleDark'] {
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[900]});
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[200]});
    }
    [data-theme='green'] {
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[50]});
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[800]});
    }
    [data-theme='greenDark'] {
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[900]});
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[200]});
    }
  `;

export default GLOBAL_CSS_COLOR;
