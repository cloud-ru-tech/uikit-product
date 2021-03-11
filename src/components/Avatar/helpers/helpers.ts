import { IAvatarProps } from 'components/Avatar/components/Default';

export const getAbbreviation = (str = '', size = 2): string => {
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
