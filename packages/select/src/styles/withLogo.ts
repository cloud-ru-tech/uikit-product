import { CSSProperties } from 'react';
import { Theme } from 'react-select';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

import { styles as commonStyles, theme as commonTheme } from './common';

const { COLORS_SELECT } = DEPRECATED_EXPORT_VARS;

export const theme = commonTheme({
  spacing: {
    controlHeight: 56,
  },
} as Theme);

export const styles = commonStyles({
  control: (styles: CSSProperties, data: any) => {
    const { isDisabled } = data;
    return {
      ...styles,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      border: 0,
      boxShadow: 'none',
      ...(isDisabled ? { color: `var(${COLORS_SELECT.DISABLED_BORDER_COLOR})` } : {}),
      backgroundColor: `var(${COLORS_SELECT.BACKGROUND_WITH_LOGO})`,
      '&:hover': {
        backgroundColor: `var(${COLORS_SELECT.BACKGROUND_WITH_LOGO_HOVER})`,
        border: 0,
        boxShadow: 'none',
      },
    };
  },
});
