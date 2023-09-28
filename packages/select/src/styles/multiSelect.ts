import { CSSProperties } from 'react';
import { PlaceholderProps } from 'react-select';

import { DEPRECATED_EXPORT_VARS, EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { SHADOW } from '@sbercloud/uikit-product-utils';

import { SIZES_IN_PX } from '../constants';
import { MultiSelectModeType, SelectSizes } from '../helpers/types';
import { styles as cStyles } from './common';
const { BLACK_ALFA } = EXPORT_VARS;

const { COLORS_SELECT } = DEPRECATED_EXPORT_VARS;

export const styles = (size: SelectSizes, externalError?: string) => {
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

      ...(error || externalError
        ? {
            borderColor: `var(${COLORS_SELECT.BORDER_ERROR_COLOR}) !important`,
          }
        : {}),
      boxShadow: 'none !important',
      background: `var(${COLORS_SELECT.BACKGROUND})`,
      ...(isDisabled
        ? {
            borderColor: `var(${BLACK_ALFA[16]})`,
            color: `var(${COLORS_SELECT.DISABLED_TEXT_COLOR})`,
            background: `var(${BLACK_ALFA[4]})`,
          }
        : {}),
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
    input: (styles: CSSProperties) => ({
      ...styles,
      color: COLORS_SELECT.TEXT_COLOR,
    }),
    menuList: (
      styles: CSSProperties,
      { selectProps: { mode } }: { selectProps: { mode: { type: MultiSelectModeType } } },
    ) => ({
      ...styles,
      borderRadius: mode.type === MultiSelectModeType.InMenuSearch ? 0 : 4,
      padding: 0,
    }),
    menu: (styles: CSSProperties) => ({
      ...styles,
      margin: 0,
      background: `var(${COLORS_SELECT.BACKGROUND})`,
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
