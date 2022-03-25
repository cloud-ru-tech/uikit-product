import { useMemo } from 'react';

import { StatusDot } from '@sbercloud/uikit-react-status';
import { extractSupportProps } from '@sbercloud/uikit-utils';

import {
  AvatarProps,
  Colors,
  PLACEHOLDER_ICONS,
  STATUS_MAP,
  Shapes,
  Sizes,
  Status,
  Variants,
  getAbbreviation,
  getColor,
} from '../helpers';
import * as S from './styled';

export type { AvatarProps };

function StylelessAvatar({
  src,
  name,
  size = Sizes.Medium,
  variant,
  status,
  onClick,
  className,
  ...rest
}: AvatarProps) {
  const content = useMemo(() => {
    if (variant === Variants.Company) {
      return PLACEHOLDER_ICONS[Variants.Company];
    }

    const abbreviation = name && getAbbreviation(name, variant);

    return abbreviation || PLACEHOLDER_ICONS[variant];
  }, [name, variant]);

  const shape = useMemo(() => {
    if (variant === Variants.User) {
      return Shapes.Round;
    }

    return Shapes.Square;
  }, [variant]);

  const color = useMemo(() => {
    if (name) {
      return getColor(name);
    }

    return Colors.SilverGray;
  }, [name]);

  return (
    <div
      data-variant={variant}
      data-shape={shape}
      data-size={size}
      data-color={color}
      data-clickable={Boolean(onClick) || undefined}
      data-status={status}
      className={className}
      {...extractSupportProps(rest)}
    >
      {src && <S.AvatarImage data-test-id='avatar__image' backgroundImage={src} />}

      <S.AvatarInner data-test-id='avatar__inner' onClick={onClick}>
        {content && <S.AvatarContent data-test-id='avatar__content'>{content}</S.AvatarContent>}
      </S.AvatarInner>

      {status && (
        <S.StatusDotWrap data-avatar-size={size} data-avatar-shape={shape}>
          <StatusDot data-test-id='avatar__status' type={STATUS_MAP.types[status]} size={STATUS_MAP.sizes[size]} />
        </S.StatusDotWrap>
      )}
    </div>
  );
}

const StyledAvatar = S.styledAvatar(StylelessAvatar);

export const Avatar = StyledAvatar as typeof StyledAvatar & {
  sizes: typeof Sizes;
  status: typeof Status;
  variants: typeof Variants;
};

Avatar.sizes = Sizes;
Avatar.status = Status;
Avatar.variants = Variants;
