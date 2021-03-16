import { CSSProperties } from 'react';
import { Props, Theme, ControlProps } from 'react-select';

import { COLORS_SELECT, COLORS } from 'theme/color/vars';

import { theme as commonTheme, styles as commonStyles } from './common';

export const theme = commonTheme({
  colors: {
    primary25: 'transparent',
  },
} as Partial<Theme>);

export const styles = commonStyles({
  control: (
    styles: CSSProperties,
    { isDisabled, menuIsOpen }: ControlProps<{ [key: string]: any }>,
  ): CSSProperties & {
    '&:hover': CSSProperties;
    '&:focus': CSSProperties;
  } => ({
    ...styles,
    flexWrap: 'nowrap',
    paddingLeft: 8,
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
  valueContainer: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    padding: '0 8px',
    flexWrap: 'nowrap',
  }),
  menuList: (
    styles: CSSProperties,
    data: ControlProps<{ [key: string]: any }>,
  ) => ({
    ...styles,
    overflowY: data.selectProps.menuListBlockScroll ? 'hidden' : 'auto',
    paddingTop: 0,
    backgroundColor: `var(${COLORS_SELECT.BACKGROUND})`,
  }),
  option: (styles: CSSProperties, props: Props) => {
    const { isSelected } = props;
    const backgroundColor = isSelected
      ? { backgroundColor: `var(${COLORS.GRAY_3})` }
      : { backgroundColor: 'transparent' };
    console.log(backgroundColor);
    const hover = {} as { '&:hover': CSSProperties };
    if (!isSelected) {
      hover['&:hover'] = {
        backgroundColor: 'transparent',
      };
    }
    return {
      ...styles,
      outline: 0,
      color: `var(${COLORS_SELECT.TEXT_COLOR})`,
      ...backgroundColor,
      ...hover,
    };
  },
  noOptionsMessage: (styles: CSSProperties) => ({
    ...styles,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
  }),
  dropdownIndicator: (styles: CSSProperties, props: Props): CSSProperties => ({
    ...styles,
    padding: '0 8px',
    transform: props.selectProps.menuIsOpen && 'rotate(180deg)',
    fill: props.selectProps.isHover
      ? `var(${COLORS_SELECT.TEXT_COLOR})`
      : 'transparent',
  }),
});
