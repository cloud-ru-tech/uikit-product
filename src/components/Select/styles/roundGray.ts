import { CSSProperties } from 'react';
import { Theme, ControlProps } from 'react-select';

import { COLORS_SELECT, COLORS } from 'theme/color/vars';

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
    {
      isDisabled,
      selectProps: { menuIsOpen },
    }: ControlProps<{ [key: string]: any }, false>,
  ): CSSProperties & {
    '&:hover': CSSProperties;
    '&:focus': CSSProperties;
  } => ({
    ...styles,
    border: menuIsOpen
      ? `1px solid var(${COLORS_SELECT.BORDER_FOCUS_COLOR})`
      : `1px solid var(${COLORS_SELECT.BORDER_COLOR})`,
    ...(isDisabled
      ? {
          borderColor: `var(${COLORS_SELECT.DISABLED_BORDER_COLOR})`,
          color: `var(${COLORS_SELECT.DISABLED_TEXT_COLOR})`,
        }
      : {}),
    background: `var(${COLORS.GRAY_2})`,
    boxShadow: 'none !importrant',
    '&:focus': {
      borderColor: `var(${COLORS_SELECT.BORDER_FOCUS_COLOR}) !imporant`,
    },
    '&:hover': {
      cursor: 'pointer',
      borderColor: menuIsOpen
        ? `var(${COLORS_SELECT.BORDER_FOCUS_COLOR})`
        : `var(${COLORS_SELECT.BORDER_HOVER_COLOR})`,
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
