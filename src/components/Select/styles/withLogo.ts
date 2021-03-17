import { Theme } from 'react-select';

import { theme as commonTheme, styles as commonStyles } from './common';

export const theme = commonTheme({
  spacing: {
    controlHeight: 36,
  },
} as Theme);

export const styles = commonStyles({});
