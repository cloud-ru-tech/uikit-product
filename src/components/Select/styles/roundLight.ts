import { CSSProperties } from 'react';
import { Theme, ControlProps } from 'react-select';

import CSSVar from 'components/Select/helpers/CSSVar';

import { theme as commonTheme, styles as commonStyles } from './common';

export const theme = commonTheme({
  borderRadius: 12,
  spacing: {
    controlHeight: 20,
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
      '&:hover': {
        backgroundColor: CSSVar('--select-option-hover-color'),
      },
    };
  },
  singleValue: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    fontSize: '12px',
    lineHeight: '16px',
  }),
  placeholder: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    fontSize: '12px',
    lineHeight: '16px',
  }),
  input: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
    margin: '0 2px',
    fontSize: '12px',
    lineHeight: '16px',
  }),
});
