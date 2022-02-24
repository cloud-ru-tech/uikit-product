import { AnchorHTMLAttributes, MouseEventHandler } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Sizes, Variant } from './constants';
import { IconWrapper, StyledArrowLinkInterfaceSVG, StyledLink } from './styled';

export type LinkProps = WithSupportProps<{
  className?: string;
  variant?: Variant;
  text?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  showIcon?: boolean;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  href?: string;
  disabled?: boolean;
  size?: Sizes;
  additionalIcon?: React.ReactElement;
}>;

export const Link = ({
  className,
  variant = Variant.OnPrimary,
  text,
  onClick,
  showIcon = false,
  target = '_blank',
  href = '#',
  disabled = false,
  size = Sizes.Medium,
  additionalIcon,
  ...rest
}: LinkProps) => (
  <StyledLink
    onClick={onClick}
    data-variant={variant}
    target={target}
    className={className}
    href={href}
    data-disabled={disabled}
    showIcon={showIcon}
    data-size={size}
    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    {...extractSupportProps(rest)}
  >
    {additionalIcon && (
      <IconWrapper data-size={size} data-variant={variant}>
        {additionalIcon}
      </IconWrapper>
    )}
    {text}
    {showIcon && <StyledArrowLinkInterfaceSVG />}
  </StyledLink>
);

Link.variants = Variant;
Link.sizes = Sizes;
