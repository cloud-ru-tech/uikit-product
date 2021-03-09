import { CSSProperties } from 'react';
import { Theme, ControlProps } from 'react-select';

import CSSVar from 'components/Select/helpers/CSSVar';

import { theme as commonTheme, styles as commonStyles } from './common';

export const theme = commonTheme({
  spacing: {
    controlHeight: 56,
  },
} as Theme);

export const styles = commonStyles({
  control: (
    styles: CSSProperties,
    data: ControlProps<{ [key: string]: unknown }, false>,
  ): CSSProperties & { '&:hover': CSSProperties } => {
    const { isDisabled } = data;
    return {
      ...styles,
      border: 0,
      ...(isDisabled
        ? { color: CSSVar('--select-option-disabled-color') }
        : {}),
      backgroundColor: CSSVar('--select-logo-primary-color'),
      '&:hover': {
        backgroundColor: CSSVar('--select-option-hover-color'),
      },
    };
  },
});
