import { useCallback } from 'react';

import { PRESET_COLORS, Types } from './constants';
import { styledTag } from './styled';
import { TagProps } from './types';

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

function StylelessTag({ color, style, children, value = '', type, className = '' }: TagProps) {
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

  return <div {...tagProps}>{children || value}</div>;
}

const StyledTag = styledTag(StylelessTag);

export { PRESET_COLORS };

export type TTagType = Types;

export type { TagProps };

export const Tag = StyledTag as typeof StyledTag & {
  types: typeof Types;
};

Tag.types = Types;
Tag.defaultProps = { type: Types.Span };
