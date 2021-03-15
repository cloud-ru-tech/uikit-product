import { CSSProperties } from 'react';
import { ControlProps } from 'react-select';

import { COLORS_SELECT } from 'theme/color/vars';

import { theme as commonTheme, styles as commonStyles } from './common';

export const theme = commonTheme();

export const styles = commonStyles({
  control: (styles: CSSProperties) => ({
    ...styles,
    minHeight: '20px',
    height: '20px',
    width: '20px',
    border: 0,
  }),
  dropdownIndicator: (
    styles: CSSProperties,
    data: ControlProps<{ [key: string]: any }, true>,
  ): CSSProperties => ({
    ...styles,
    fill: data.selectProps.menuIsOpen
      ? `var(${COLORS_SELECT.TEXT_COLOR})`
      : 'none',
    transform: data.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
  }),
  menu: (styles: CSSProperties) => ({
    ...styles,
    width: '124px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
    borderRadius: 4,
  }),
  menuList: (styles: CSSProperties) => ({
    ...styles,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  }),
});
