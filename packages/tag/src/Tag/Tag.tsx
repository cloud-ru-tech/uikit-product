import { useCallback } from 'react';

import { PRESET_COLORS, PresetColorType } from './constants';
import { StyledTag } from './styled';

enum Types {
  Card = 'card',
  Span = 'span',
}

export type TTagType = Types;

export type TagProps = {
  value?: string;
  type?: TTagType;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  color?: PresetColorType | string;
};

const PresetColorRegex = new RegExp(`^(${PRESET_COLORS.join('|')})(-inverse)?$`);

const getTagStyles = ({
  isPresetBackground,
  style,
  color,
}: {
  isPresetBackground: boolean;
  style?: React.CSSProperties;
  color?: string;
}) => {
  if (isPresetBackground) {
    return style;
  }

  return { ...style, backgroundColor: color };
};

export function Tag({ color, style, children, value = '', type = Types.Span, className = '' }: TagProps) {
  const isPresetColor = useCallback((): boolean => {
    if (!color) {
      return false;
    }
    return PresetColorRegex.test(color);
  }, [color]);

  const isPresetBackground = isPresetColor();
  const tagStyles = getTagStyles({ isPresetBackground, style, color });

  const tagProps = {
    ...(isPresetBackground && type !== 'card' ? { 'data-tag-color': color } : {}),
    style: tagStyles,
    className,
  };

  return (
    <StyledTag {...tagProps} type={type}>
      {children || value}
    </StyledTag>
  );
}

export { PRESET_COLORS };

Tag.types = Types;
