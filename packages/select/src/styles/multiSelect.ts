import { CSSProperties } from 'react';
import { PlaceholderProps } from 'react-select';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { SHADOW } from '@sbercloud/uikit-product-utils';

import { SIZES_IN_PX } from '../constants';
import { SelectSizes } from '../helpers/types';
import { styles as cStyles } from './common';

const { COLORS_SELECT } = DEPRECATED_EXPORT_VARS;

export const styles = (size: SelectSizes) => {
  const commonStyles = cStyles({
    control: (
      styles: CSSProperties,
      {
        isDisabled,
        selectProps: { menuIsOpen, error },
      }: { isDisabled: boolean; selectProps: { menuIsOpen: boolean; error: boolean } },
    ) => ({
      ...styles,
      minHeight: 'auto',
      border: `1px solid var(${menuIsOpen ? COLORS_SELECT.BORDER_FOCUS_COLOR : COLORS_SELECT.BORDER_COLOR})`,
      ...(isDisabled
        ? {
            borderColor: `var(${COLORS_SELECT.DISABLED_BORDER_COLOR})`,
            color: `var(${COLORS_SELECT.DISABLED_TEXT_COLOR})`,
            background: `var(${COLORS_SELECT.DISABLED_BACKGROUND})`,
          }
        : {}),
      ...(error
        ? {
            border: `1px solid var(${COLORS_SELECT.BORDER_ERROR_COLOR})`,
          }
        : {}),
      boxShadow: 'none !important',
      background: `var(${COLORS_SELECT.BACKGROUND})`,
      cursor: isDisabled ? 'not-allowed' : 'default',
      '&:focus': {
        borderColor: `var(${COLORS_SELECT.BORDER_FOCUS_COLOR}) !important`,
      },
      '&:hover': {
        cursor: 'pointer',
        background: `var(${COLORS_SELECT.BACKGROUND_HOVER})`,
        borderColor: menuIsOpen
          ? `var(${COLORS_SELECT.BORDER_FOCUS_COLOR})`
          : `var(${COLORS_SELECT.BORDER_HOVER_COLOR})`,
      },
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
      boxShadow: SHADOW.MEDIUM,
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
