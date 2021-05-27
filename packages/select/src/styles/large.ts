import { Theme } from 'react-select';

import { styles as commonStyles, theme as commonTheme } from './common';

export const theme = commonTheme({
  spacing: {
    controlHeight: 44,
  },
} as Theme);

export const styles = commonStyles();
