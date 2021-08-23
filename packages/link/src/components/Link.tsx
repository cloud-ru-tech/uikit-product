import { AnchorHTMLAttributes, MouseEventHandler } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Variant } from './constants';
import { StyledArrowLinkInterfaceSVG, StyledLink } from './styled';

export type LinkProps = WithSupportProps<{
  className?: string;
  variant?: Variant;
  text?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  showIcon?: boolean;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  href?: string;
  disabled?: boolean;
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
    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    {...extractSupportProps(rest)}
  >
    {text}
    {showIcon && <StyledArrowLinkInterfaceSVG />}
  </StyledLink>
);

Link.variants = Variant;
