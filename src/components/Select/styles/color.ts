import { CSSProperties } from 'react';
import { ControlProps } from 'react-select';
import { css } from '@linaria/core';

import { theme as commonTheme, styles as commonStyles } from './common';

export const theme = commonTheme();

export const styles = commonStyles({
  control: css`
    min-height: 20px;
    height: 20px;
    width: 20px;
    box-sizing: content-box;
    border: 0;
  `,
  dropdownIndicator: (
    styles: CSSProperties,
    data: ControlProps<{ [key: string]: unknown }, true>,
  ): CSSProperties => ({
    ...styles,
    fill: data.selectProps.menuIsOpen ? '#343f48' : 'none',
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
