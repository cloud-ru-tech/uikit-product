import { IAvatarProps } from 'components/Avatar/components/Default';

export const getCustomStyles = (
  isCustomSize: boolean,
  size: IAvatarProps['size'],
  letterSize: IAvatarProps['letterSize'],
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

export const getCustomBg = (src: IAvatarProps['src']): React.CSSProperties => {
  if (!src) {
    return {};
  }

  return { backgroundImage: `url(${src})`, backgroundSize: 'cover' };
};

export const getCustomRadius = (
  isCustomRadius: boolean,
  radius: IAvatarProps['radius'],
): React.CSSProperties =>
  isCustomRadius ? { borderRadius: `${radius}px` } : {};
