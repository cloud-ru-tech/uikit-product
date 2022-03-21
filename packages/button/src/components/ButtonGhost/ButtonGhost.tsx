import { ReactElement, ReactText } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonProps } from '../../types';
import { IconPosition, Sizes, Variant } from './constants';
import * as S from './styled';

export type ButtonGhostProps = {
  text: ReactText;
  variant?: Variant;
  size?: Sizes;
  icon?: ReactElement;
  iconPosition?: IconPosition;
} & CommonButtonProps;

const ButtonGhostBase = ({
  text,
  variant = Variant.Primary,
  size = Sizes.Medium,
  icon,
  iconPosition = IconPosition.After,
  className,
  ...rest
}: ButtonGhostProps) => (
  <S.StyledBaseButton className={className} data-variant={variant} data-size={size} {...extractCommonButtonProps(rest)}>
    {icon && iconPosition === IconPosition.Before && (
      <S.IconWrapper data-size={size} data-position={iconPosition}>
        {icon}
      </S.IconWrapper>
    )}
    {text}
    {icon && iconPosition === IconPosition.After && (
      <S.IconWrapper data-size={size} data-position={iconPosition}>
        {icon}
      </S.IconWrapper>
    )}
  </S.StyledBaseButton>
);

const ButtonGhostWithTooltip = withTooltip(ButtonGhostBase);

export const ButtonGhost = ButtonGhostWithTooltip as typeof ButtonGhostWithTooltip & {
  variants: typeof Variant;
  sizes: typeof Sizes;
  iconPosition: typeof IconPosition;
};

ButtonGhost.variants = Variant;
ButtonGhost.sizes = Sizes;
ButtonGhost.iconPosition = IconPosition;
