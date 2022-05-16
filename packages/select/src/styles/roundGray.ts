import { CSSProperties } from 'react';
import { Theme } from 'react-select';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';

import { styles as commonStyles, theme as commonTheme } from './common';

const { COLORS_SELECT, COLORS } = DEPRECATED_EXPORT_VARS;

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
    { isDisabled, selectProps: { menuIsOpen } }: { isDisabled: boolean; selectProps: { menuIsOpen: boolean } },
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
    boxShadow: 'none !important',
    '&:focus': {
      borderColor: `var(${COLORS_SELECT.BORDER_FOCUS_COLOR}) !important`,
    },
    '&:hover': {
      cursor: 'pointer',
      borderColor: menuIsOpen ? `var(${COLORS_SELECT.BORDER_FOCUS_COLOR})` : `var(${COLORS_SELECT.BORDER_HOVER_COLOR})`,
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
