import { useMemo } from 'react';

import { PLACHOLDER_ICONS } from '../helpers/constants';
import { getAbbreviation } from '../helpers/getAbbreviation';
import { PlaceholderIcons, PresetColors, Shapes, Sizes } from '../helpers/types';
import * as S from './styled';

export interface AvatarProps {
  size?: Sizes;
  src?: string;
  shape?: Shapes;
  username?: string;
  color?: PresetColors;
  placeholderIcon?: PlaceholderIcons;
}

export function Avatar({
  src,
  username,
  size = Sizes.M,
  shape = Shapes.Circle,
  color = PresetColors.DefaultGray,
  placeholderIcon = PlaceholderIcons.User,
}: AvatarProps) {
  const content = useMemo(() => {
    if (src) {
      return null;
    }

    if (username) {
      return getAbbreviation(username);
    }

    return PLACHOLDER_ICONS[placeholderIcon];
  }, [src, username, placeholderIcon]);

  return (
    <S.Avatar data-shape={shape} data-size={size} backgroundImage={src} data-color={color}>
      {content}
    </S.Avatar>
  );
}

Avatar.shapes = Shapes;
Avatar.sizes = Sizes;
Avatar.colors = PresetColors;
Avatar.placeholderIcons = PlaceholderIcons;
