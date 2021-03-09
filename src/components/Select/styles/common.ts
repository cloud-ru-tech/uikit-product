import { CSSProperties } from 'react';
import { Props, Theme, ControlProps } from 'react-select';
import CSSVar from 'components/Select/helpers/CSSVar';

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
    primary: CSSVar('--select-primary-color'),
    primary25: CSSVar('--select-conrtrol-hover-color'),
    ...(typeTheme?.colors || {}),
  },
});

// TODO
// eslint-disable-next-line
export const styles = (typeStyles?: any): any => ({
  valueContainer: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    padding: '0 8px',
  }),
  control: (
    styles: CSSProperties,
    data: ControlProps<{ [key: string]: unknown }, false>,
  ): CSSProperties & { '&:hover': CSSProperties } => {
    const { isDisabled, isMulti } = data;
    const hover = {} as { '&:hover': CSSProperties };
    if (!isMulti) {
      hover['&:hover'] = {
        backgroundColor: CSSVar('--select-option-hover-color'),
      };
    }
    return {
      ...styles,
      border: `1px solid ${CSSVar('--select-conrtrol-border-color')}`,
      ...(isDisabled
        ? { color: CSSVar('--select-option-disabled-color') }
        : {}),
      ...hover,
    };
  },
  dropdownIndicator: (styles: CSSProperties, data: Props): CSSProperties => ({
    ...styles,
    padding: '0 8px',
    transform: data.selectProps.menuIsOpen && 'rotate(180deg)',
  }),
  input: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
    margin: '0 2px',
    fontSize: '14px',
    lineHeight: '20px',
  }),
  placeholder: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    fontSize: '14px',
    lineHeight: '20px',
  }),
  menu: (styles: CSSProperties, state: Props): CSSProperties => ({
    ...styles,
    ...(state?.selectProps?.optionNoWrap ? { right: 0, width: 'auto' } : {}),
    borderRadius: '4px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
    ...(state?.selectProps?.menuRelative ? { position: 'relative' } : {}),
  }),
  option: (styles: CSSProperties, state: Props): CSSProperties => ({
    ...styles,
    ...(state?.selectProps?.optionNoWrap ? { whiteSpace: 'nowrap' } : {}),
    color: CSSVar('--select-option-color'),
  }),
  multiValue: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    backgroundColor: CSSVar('--select-primary-color'),
    color: CSSVar('--select-option-color'),
  }),
  multiValueLabel: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    fontSize: '12px',
    lineHeight: '16px',
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
  groupHeading: (styles: CSSProperties): CSSProperties => ({
    ...styles,
    textTransform: 'none',
    margin: 0,
    padding: '8px 12px 4px 12px',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    color: '#A0A0A0',
  }),
  multiValueRemove: (
    styles: CSSProperties,
  ): CSSProperties & { '&:hover': CSSProperties } => ({
    ...styles,
    fill: CSSVar('--select-conrtrol-multiValueRemove-color'),
    '&:hover': {
      backgroundColor: 'transparent',
      fill: CSSVar('--select-conrtrol-multiValueRemove-hover-color'),
    },
  }),
  ...(typeStyles || {}),
});
