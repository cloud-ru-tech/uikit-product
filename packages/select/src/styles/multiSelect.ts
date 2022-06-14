import { CSSProperties } from 'react';
import { PlaceholderProps } from 'react-select';

import { SIZES_IN_PX } from '../constants';
import { SelectSizes } from '../helpers/types';
import { styles as cStyles } from './common';

export const styles = (size: SelectSizes) => {
  const commonStyles = cStyles({
    control: (styles: CSSProperties) => ({
      ...styles,
      minHeight: 'auto',
    }),
    valueContainer: (styles: CSSProperties) => ({
      ...styles,
      flexWrap: 'wrap',
      minHeight: SIZES_IN_PX[size].minHeight,
      padding: SIZES_IN_PX[size].padding,
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

  return {
    ...commonStyles,
    placeholder: (base: CSSProperties, props: PlaceholderProps<never, boolean>) => ({
      ...commonStyles.placeholder(base, props),
      marginLeft: '4px',
    }),
  };
};
