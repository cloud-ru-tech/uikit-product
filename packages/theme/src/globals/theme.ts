import { GREY } from '../color/vars';

const GENERAL_COLOR = {
  BACKGROUND: '--general-background-color',
  TEXT: '--general-text-color',
};

export const generalTheme = `
    [data-theme='purple'] {
      ${GENERAL_COLOR.BACKGROUND}: var(${GREY[50]});
      ${GENERAL_COLOR.TEXT}: var(${GREY[800]});
    }
    [data-theme='purpleDark'] {
      ${GENERAL_COLOR.BACKGROUND}: var(${GREY[900]});
      ${GENERAL_COLOR.TEXT}: var(${GREY[200]});
    }
    [data-theme='green'] {
      ${GENERAL_COLOR.BACKGROUND}: var(${GREY[50]});
      ${GENERAL_COLOR.TEXT}: var(${GREY[800]});
    }
    [data-theme='greenDark'] {
      ${GENERAL_COLOR.BACKGROUND}: var(${GREY[900]});
      ${GENERAL_COLOR.TEXT}: var(${GREY[200]});
    }
  `;

export default GENERAL_COLOR;
