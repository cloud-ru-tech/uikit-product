import { useMemo } from 'react';

import {
  getAbbreviation,
  getCustomBg,
  getCustomRadius,
  getCustomStyles,
} from 'components/Avatar/helpers/helpers';

import { StyledAvatar } from './styled';

export interface IAvatarProps {
  shape?: 'circle' | 'square';
  size?: number | 'm' | 'l';
  src?: string;
  icon?: React.ReactNode;
  letterSize?: number;
  className?: string;
  radius?: number;
}

export const Avatar: React.FC<IAvatarProps> = props => {
  const {
    children,
    src,
    icon,
    size,
    letterSize,
    shape,
    className,
    radius,
  } = props;
  const isCustomSize = typeof size === 'number';
  const isCustomRadius = typeof radius === 'number';

  const content = useMemo(() => {
    if (src) {
      return null;
    }

    if (icon) {
      return icon;
    }

    if (children && typeof children === 'string') {
      return getAbbreviation(children);
    }

    return null;
  }, [children, src, icon]);

  const customStyles = useMemo(
    () => ({
      ...getCustomStyles(isCustomSize, size, letterSize),
      ...getCustomBg(src),
      ...getCustomRadius(isCustomRadius, radius),
    }),
    [isCustomSize, size, letterSize, src, isCustomRadius, radius],
  );

  return (
    <StyledAvatar
      style={customStyles}
      data-shape={shape}
      data-size={size}
      className={className}
    >
      {content}
    </StyledAvatar>
  );
};

Avatar.defaultProps = {
  shape: 'circle',
  size: 'm',
};
