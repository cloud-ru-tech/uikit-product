import { useCallback } from 'react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

import { PRESET_COLORS, PresetColorType } from '../helpers/colors';
import { StyledInputAutosize, StyledTag } from './styled';

const { COLORS_TAG } = DEPRECATED_EXPORT_VARS;

enum Types {
  Card = 'card',
  Span = 'span',
  Input = 'input',
}

export type TTagType = Types;

export type TagProps = {
  value?: string;
  type?: TTagType;
  className?: string;
  inputClassNames?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  color?: PresetColorType | string;
  inputRef?: (instance: HTMLInputElement | null) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PresetColorRegex = new RegExp(`^(${PRESET_COLORS.join('|')})(-inverse)?$`);

const presetColors = {
  [PRESET_COLORS[0]]: COLORS_TAG.TAG_BG_GREEN,
  [PRESET_COLORS[1]]: COLORS_TAG.TAG_BG_BLUE,
  [PRESET_COLORS[2]]: COLORS_TAG.TAG_BG_PURPLE,
  [PRESET_COLORS[3]]: COLORS_TAG.TAG_BG_PINK,
  [PRESET_COLORS[4]]: COLORS_TAG.TAG_BG_RED,
  [PRESET_COLORS[5]]: COLORS_TAG.TAG_BG_GRAY_DEFAULT,
  [PRESET_COLORS[6]]: COLORS_TAG.TAG_BG_GRAY,
  [PRESET_COLORS[7]]: COLORS_TAG.TAG_BG_BROWN,
  [PRESET_COLORS[8]]: COLORS_TAG.TAG_BG_ORANGE,
  [PRESET_COLORS[9]]: COLORS_TAG.TAG_BG_YELLOW,
  [PRESET_COLORS[10]]: COLORS_TAG.TAG_BG_YELLOW_GREEN,
  [PRESET_COLORS[11]]: COLORS_TAG.TAG_BG_BLUE_GREEN,
};

const getTagStyles = ({
  isPresetBackground,
  style,
  type,
  color,
}: {
  isPresetBackground: boolean;
  style?: React.CSSProperties;
  type?: TTagType;
  color?: string;
}) => {
  if (isPresetBackground) {
    if (type === Types.Input && color) {
      return { ...style, backgroundColor: `var(${presetColors[color]})` };
    }

    return style;
  }

  return { ...style, backgroundColor: color };
};

export function Tag({
  color,
  style,
  onChange,
  children,
  inputRef,
  value = '',
  type = Types.Span,
  className = '',
  inputClassNames,
}: TagProps) {
  const isPresetColor = useCallback((): boolean => {
    if (!color) {
      return false;
    }
    return PresetColorRegex.test(color);
  }, [color]);

  const isPresetBackground = isPresetColor();
  const tagStyles = getTagStyles({ isPresetBackground, type, style, color });

  const tagProps = {
    ...(isPresetBackground && type !== 'card' ? { 'data-tag-color': color } : {}),
    style: tagStyles,
    className,
  };

  if (type === Types.Input) {
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

  return (
    <StyledTag {...tagProps} type={type}>
      {children || value}
    </StyledTag>
  );
}

Tag.types = Types;
