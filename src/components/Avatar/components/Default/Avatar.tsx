import React, { useMemo, CSSProperties } from 'react';

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

const getAbbreviation = (str = '', size = 2): string => {
  const SPACE = ' ';
  const trimStr = str.trim();

  if (!trimStr) {
    return '';
  }

  if (str && str.length > size) {
    trimStr
      .replace(/(\s{2,})/g, SPACE)
      .split(SPACE)
      .slice(0, 2)
      .map(el => el?.charAt(0)?.toUpperCase())
      .join('');
  }

  return trimStr;
};

export default getAbbreviation;

const getCustomStyles = (
  isCustomSize: boolean,
  size: IAvatarProps['size'],
  letterSize: IAvatarProps['letterSize'],
): CSSProperties => {
  if (!isCustomSize) {
    return {};
  }

  return {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${letterSize}px`,
  };
};

const getCustomBg = (src: IAvatarProps['src']): CSSProperties => {
  if (!src) {
    return {};
  }

  return { backgroundImage: `url(${src})`, backgroundSize: 'cover' };
};

const getCustomRadius = (
  isCustomRadius: boolean,
  radius: IAvatarProps['radius'],
): CSSProperties => (isCustomRadius ? { borderRadius: `${radius}px` } : {});

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
