import { CSSProperties } from 'react';
import { Props, Theme, ControlProps } from 'react-select';

import { COLORS_SELECT } from 'theme/color/vars';

import { theme as commonTheme, styles as commonStyles } from './common';

export const theme = commonTheme({
  colors: {
    primary25: 'transparent',
  },
} as Partial<Theme>);

export const styles = commonStyles({
  control: (
    styles: CSSProperties,
    { isDisabled }: ControlProps<{ [key: string]: any }>,
  ): CSSProperties => ({
    ...styles,
    border: 0,
    boxShadow: 'none',
    flexWrap: 'nowrap',
    ...(isDisabled
      ? {
          borderColor: `var(${COLORS_SELECT.DISABLED_BORDER_COLOR})`,
          color: `var(${COLORS_SELECT.DISABLED_TEXT_COLOR})`,
          background: `var(${COLORS_SELECT.DISABLED_BACKGROUND})`,
        }
      : {}),
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
  }),
  option: (styles: CSSProperties, props: Props) => {
    const { isSelected } = props;
    const backgroundColor = isSelected
      ? {}
      : { backgroundColor: 'transparent' };
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
    fill: props.selectProps.isHover ? '#343F48' : 'transparent',
  }),
});
