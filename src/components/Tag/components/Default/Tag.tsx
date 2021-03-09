import React, { useCallback } from 'react';

import { PRESET_COLORS, PresetColorType } from 'components/Tag/helpers/colors';

import { Tag as StyledTag, StyledInputAutosize } from './styled';

export const TAG_TYPES = {
  SPAN: 'span',
  INPUT: 'input',
} as const;

type TTagType = TAG_TYPES.SPAN | TAG_TYPES.INPUT;

export interface TTagProps {
  size?: number;
  value?: string;
  tag?: TTagType;
  className?: string;
  inputClassNames?: string;
  style?: React.CSSProperties;
  color?: PresetColorType | string;
  inputRef?: (instance: HTMLInputElement | null) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PresetColorRegex = new RegExp(
  `^(${PRESET_COLORS.join('|')})(-inverse)?$`,
);

export const Tag: React.FC<TTagProps> = ({
  children,
  color,
  style,
  className,
  inputClassNames,
  tag = 'span',
  value = '',
  onChange,
  inputRef,
}) => {
  const isPresetColor = useCallback((): boolean => {
    if (!color) {
      return false;
    }
    return PresetColorRegex.test(color);
  }, [color]);

  const tagProps = {
    ...(isPresetColor() ? { 'data-tag-color': color } : { background: color }),
    style,
    className,
  };

  // TODO: check input styles and style prop
  if (tag === TAG_TYPES.INPUT) {
    return (
      <StyledInputAutosize
        {...tagProps}
        inputRef={inputRef}
        inputClassName={inputClassNames}
        defaultValue={value}
        onChange={onChange}
      />
    );
  }

  return <StyledTag {...tagProps}>{children || value}</StyledTag>;
};

Tag.defaultProps = {
  className: '',
};
