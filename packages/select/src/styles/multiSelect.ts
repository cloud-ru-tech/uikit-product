import { CSSProperties } from 'react';

import { styles as commonStyles } from './common';

export const styles = commonStyles({
  valueContainer: (styles: CSSProperties) => ({
    ...styles,
    flexWrap: 'wrap',
    minHeight: '52px',
    padding: '8px',
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
