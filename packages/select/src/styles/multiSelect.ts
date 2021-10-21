import { CSSProperties } from 'react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

import { styles as commonStyles } from './common';

export const styles = commonStyles({
  valueContainer: (styles: CSSProperties) => ({
    ...styles,
    flexWrap: 'wrap',
    minHeight: '52px',
    padding: '8px',
  }),
  multiValue: (styles: CSSProperties) => ({
    ...styles,
    backgroundColor: `var(${EXPORT_VARS.BLACK_ALFA[4]})`,
    color: `grey`,
    padding: '4px 8px',
    margin: '4px',
  }),
  multiValueLabel: (styles: CSSProperties) => ({
    ...styles,
    fontSize: '14px',
    lineHeight: '14px',
    color: `var(${EXPORT_VARS.GREY[600]})`,
  }),
  menuList: (styles: CSSProperties) => ({
    ...styles,
    borderRadius: '4px',
    padding: 0,
  }),
  menu: (styles: CSSProperties) => ({
    ...styles,
    margin: '0',
  }),
});
