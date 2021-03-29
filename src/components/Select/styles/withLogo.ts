import { Theme } from 'react-select';

import { COLORS_SELECT } from 'theme/color/vars';

import { theme as commonTheme, styles as commonStyles } from './common';

export const theme = commonTheme({
  spacing: {
    controlHeight: 56,
  },
} as Theme);

export const styles = commonStyles({
  control: (styles, data) => {
    const { isDisabled } = data;
    return {
      ...styles,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      border: 0,
      ...(isDisabled
        ? { color: `var(${COLORS_SELECT.DISABLED_BORDER_COLOR})` }
        : {}),
      backgroundColor: `var(${COLORS_SELECT.BACKGROUND_WITH_LOGO})`,
      '&:hover': {
        backgroundColor: `var(${COLORS_SELECT.BACKGROUND_WITH_LOGO_HOVER})`,
      },
    };
  },
});
