import { COLOR_VALUES, Colors, Types } from './constants';
import { styledTag } from './styled';
import { TagProps } from './types';

function StylelessTag({ color, style, children, value = '', type, className = '' }: TagProps) {
  const isCustomColor = !(COLOR_VALUES as Array<string | undefined>).includes(color);

  return (
    <div
      className={className}
      style={isCustomColor ? { ...style, backgroundColor: color } : style}
      data-tag-color={isCustomColor || type === Types.Card ? undefined : color}
    >
      {children || value}
    </div>
  );
}

const StyledTag = styledTag(StylelessTag);

export type { TagProps };

export const Tag = StyledTag as typeof StyledTag & {
  types: typeof Types;
  colors: typeof Colors;
};

Tag.types = Types;
Tag.colors = Colors;
Tag.defaultProps = { type: Types.Span };
