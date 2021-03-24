import { CSSProperties } from 'react';
import { Props, Theme, Styles } from 'react-select';

import { COLORS_GENERAL, COLORS_SELECT } from 'theme/color/vars';

export const theme = (typeTheme?: Partial<Theme>) => (theme: Theme): Theme => ({
  ...theme,
  borderRadius: 4,
  ...(typeTheme || {}),
  spacing: {
    ...theme.spacing,
    baseUnit: 4,
    controlHeight: 36,
    menuGutter: 4,
    ...(typeTheme?.spacing || {}),
  },
  colors: {
    ...theme.colors,
    ...(typeTheme?.colors || {}),
  },
});

export const styles = (typeStyles?: Styles): Styles => ({
  valueContainer: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    padding: '0 8px',
  }),
  control: (
    styles: CSSProperties,
    { isDisabled, selectProps: { menuIsOpen } },
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
          background: `var(${COLORS_SELECT.DISABLED_BACKGROUND})`,
        }
      : {}),
    background: `var(${COLORS_SELECT.BACKGROUND})`,
    boxShadow: 'none !importrant',
    cursor: isDisabled ? 'not-allowed' : 'default',
    '&:focus': {
      borderColor: `var(${COLORS_SELECT.BORDER_FOCUS_COLOR}) !imporant`,
    },
    '&:hover': {
      cursor: 'pointer',
      background: `var(${COLORS_SELECT.BACKGROUND_HOVER})`,
      borderColor: menuIsOpen
        ? `var(${COLORS_SELECT.BORDER_FOCUS_COLOR})`
        : `var(${COLORS_SELECT.BORDER_HOVER_COLOR})`,
    },
  }),
  menuList: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    color: 'red',
    backgroundColor: `var(${COLORS_SELECT.BACKGROUND})`,
  }),
  singleValue: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    color: `var(${COLORS_SELECT.TEXT_COLOR})`,
  }),
  dropdownIndicator: (
    styles: CSSProperties,
    { selectProps: { menuIsOpen }, isDisabled }: Props,
  ): CSSProperties => ({
    ...styles,
    padding: '0 8px',
    fill: isDisabled
      ? `var(${COLORS_SELECT.DISABLED_TEXT_COLOR})`
      : `var(${COLORS_SELECT.TEXT_COLOR})`,
    transform: menuIsOpen && 'rotate(180deg)',
  }),
  input: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
    margin: '0 2px',
    fontSize: '14px',
    lineHeight: '20px',
  }),
  placeholder: (styles: CSSProperties, { isDisabled }): CSSProperties => ({
    ...styles,
    fontSize: '14px',
    lineHeight: '20px',
    color: isDisabled
      ? `var(${COLORS_SELECT.DISABLED_TEXT_COLOR})`
      : `var(${COLORS_SELECT.PLACEHOLDER_TEXT_COLOR})`,
  }),
  menu: (styles: CSSProperties, state: Props): CSSProperties => ({
    ...styles,
    ...(state?.selectProps?.optionNoWrap ? { right: 0, width: 'auto' } : {}),
    borderRadius: '4px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
    ...(state?.selectProps?.menuRelative ? { position: 'relative' } : {}),
  }),
  option: (
    styles: CSSProperties,
    state: Props,
  ): CSSProperties & {
    '&:hover': CSSProperties;
    '&:active': CSSProperties;
  } => ({
    ...styles,
    ...(state?.selectProps?.optionNoWrap ? { whiteSpace: 'nowrap' } : {}),
    ...(state?.selectProps?.collapsedGroup ? { paddingLeft: 40 } : {}),
    color: `var(${COLORS_SELECT.TEXT_COLOR})`,
    outline: 'none',
    backgroundColor: state.isSelected
      ? `var(${COLORS_SELECT.DROPDOWN_FOCUS_BACKGROUND})`
      : `var(${COLORS_SELECT.BACKGROUND})`,
    '&:hover': {
      cursor: 'pointer',
      borderColor: 'transparent',
      backgroundColor: `var(${COLORS_SELECT.DROPDOWN_HOVER_BACKGROUND})`,
    },
    '&:active': {
      backgroundColor: `var(${COLORS_SELECT.DROPDOWN_HOVER_BACKGROUND})`,
    },
  }),
  multiValue: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    backgroundColor: `var(${COLORS_SELECT.TEXT_COLOR})`,
    color: `var(${COLORS_SELECT.BACKGROUND})`,
  }),
  multiValueLabel: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    fontSize: '12px',
    lineHeight: '16px',
    color: `var(${COLORS_SELECT.BACKGROUND})`,
  }),
  group: (
    styles: CSSProperties,
  ): CSSProperties & { '&:not(:first-child)': CSSProperties } => ({
    ...styles,
    padding: 0,
    '&:not(:first-child)': {
      borderTop: '1px solid #e4e4e4',
    },
  }),
  groupHeading: (styles: CSSProperties, props: Props): CSSProperties => {
    const collapsedGroup = props?.selectProps?.collapsedGroup;

    const collapsedStyles: CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      margin: '4px 0 0 0',
      padding: '8px 12px',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      color: `var(${COLORS_GENERAL.TEXT})`,
      fill: `var(${COLORS_GENERAL.TEXT})`,
      cursor: 'pointer',
    };

    return {
      ...styles,
      textTransform: 'none',
      margin: 0,
      padding: '8px 12px 4px 12px',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
      color: `var(${COLORS_SELECT.GROUP_HEADING_TEXT_COLOR})`,
      ...(collapsedGroup ? collapsedStyles : {}),
    };
  },
  multiValueRemove: (
    styles: CSSProperties,
  ): CSSProperties & { '&:hover': CSSProperties } => ({
    ...styles,
    fill: `var(${COLORS_SELECT.BACKGROUND})`,
    '&:hover': {
      backgroundColor: 'transparent',
      fill: `var(${COLORS_SELECT.TEXT_COLOR})`,
    },
  }),
  ...(typeStyles || {}),
});
