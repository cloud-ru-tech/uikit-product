import { useCallback } from 'react';

import { COLORS_TAG } from 'theme/color/vars';
import { PRESET_COLORS, PresetColorType } from 'components/Tag/helpers/colors';

import { StyledTag, StyledInputAutosize } from './styled';

const TAG_TYPES = {
  SPAN: 'span',
  INPUT: 'input',
};

type TTagType = 'span' | 'input';

export interface ITagProps {
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
};

const getTagStyles = ({
  isPresetBackground,
  style,
  tag,
  color,
}: {
  isPresetBackground: boolean;
  style?: React.CSSProperties;
  tag?: TTagType;
  color?: string;
}) => {
  if (isPresetBackground) {
    if (tag === TAG_TYPES.INPUT && color) {
      return { ...style, backgroundColor: `var(${presetColors[color]})` };
    }

    return style;
  }

  return { ...style, backgroundColor: color };
};

export const Tag: React.FC<ITagProps> = ({
  color,
  style,
  onChange,
  children,
  inputRef,
  value = '',
  tag = 'span',
  className = '',
  inputClassNames,
}) => {
  const isPresetColor = useCallback((): boolean => {
    if (!color) {
      return false;
    }
    return PresetColorRegex.test(color);
  }, [color]);

  const isPresetBackground = isPresetColor();
  const tagStyles = getTagStyles({ isPresetBackground, tag, style, color });

  const tagProps = {
    ...(isPresetBackground ? { 'data-tag-color': color } : {}),
    style: tagStyles,
    className,
  };

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
