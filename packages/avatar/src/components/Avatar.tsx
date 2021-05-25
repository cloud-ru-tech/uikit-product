import { useMemo } from 'react';

import { getAbbreviation } from '../helpers/getAbbreviation';
import { getCustomBg, getCustomRadius, getCustomStyles } from '../helpers/styleHelpers';
import { StyledAvatar } from './styled';
import { Shapes } from './types';

export type AvatarProps = {
  shape?: Shapes;
  username?: string;
  size?: number | 'm' | 'l';
  src?: string;
  icon?: React.ReactNode;
  letterSize?: number;
  className?: string;
  radius?: number;
};

export function Avatar({ src, icon, size, letterSize, shape, className, radius, username }: AvatarProps) {
  const isCustomSize = typeof size === 'number';
  const isCustomRadius = typeof radius === 'number';

  const content = useMemo(() => {
    if (src) {
      return null;
    }

    if (icon) {
      return icon;
    }

    if (username) {
      return getAbbreviation(username);
    }

    return null;
  }, [username, src, icon]);

  const customStyles = useMemo(
    () => ({
      ...getCustomStyles(isCustomSize, size, letterSize),
      ...getCustomBg(src),
      ...getCustomRadius(isCustomRadius, radius),
    }),
    [isCustomSize, size, letterSize, src, isCustomRadius, radius],
  );

  return (
    <StyledAvatar style={customStyles} data-shape={shape} data-size={size} className={className}>
      {content}
    </StyledAvatar>
  );
}

Avatar.shapes = Shapes;

Avatar.defaultProps = {
  shape: Shapes.Circle,
  size: 'm',
};
