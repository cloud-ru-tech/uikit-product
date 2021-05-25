import { AvatarProps } from '../components';

export const getCustomStyles = (
  isCustomSize: boolean,
  size: AvatarProps['size'],
  letterSize: AvatarProps['letterSize'],
): React.CSSProperties => {
  if (!isCustomSize) {
    return {};
  }

  return {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${letterSize}px`,
  };
};

export const getCustomBg = (src: AvatarProps['src']): React.CSSProperties => {
  if (!src) {
    return {};
  }

  return { backgroundImage: `url(${src})`, backgroundSize: 'cover' };
};

export const getCustomRadius = (isCustomRadius: boolean, radius: AvatarProps['radius']): React.CSSProperties =>
  isCustomRadius ? { borderRadius: `${radius}px` } : {};
