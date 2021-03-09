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
  singleValue: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    fontSize: '12px',
    lineHeight: '16px',
  }),
  control: (
    styles: CSSProperties,
    { isDisabled }: ControlProps<{ [key: string]: unknown }, false>,
  ): CSSProperties & { '&:hover': CSSProperties } => ({
    ...styles,
    border: 0,
    ...(isDisabled ? { color: CSSVar('--select-option-disabled-color') } : {}),
    backgroundColor: CSSVar('--select-roundGray-primary-color'),
    '&:hover': {
      backgroundColor: CSSVar('--select-roundGray-primary-hover-color'),
    },
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
