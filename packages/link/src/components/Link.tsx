import { AnchorHTMLAttributes, MouseEventHandler } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { Sizes, Variant } from './constants';
import { IconWrapper, StyledArrowLinkInterfaceSVG, StyledLink } from './styled';

export type LinkProps = WithSupportProps<{
  className?: string;
  variant?: Variant;
  text?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  showSuffixIcon?: boolean;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  href?: string;
  disabled?: boolean;
  size?: Sizes;
  prefixIcon?: React.ReactElement;
}>;

export const Link = ({
  className,
  variant = Variant.OnPrimary,
  text,
  onClick,
  showSuffixIcon = false,
  target = '_blank',
  href = '#',
  disabled = false,
  size = Sizes.Medium,
  prefixIcon,
  ...rest
}: LinkProps) => (
  <StyledLink
    onClick={onClick}
    data-variant={variant}
    target={target}
    className={className}
    href={href}
    data-disabled={disabled}
    showSuffixIcon={showSuffixIcon}
    data-size={size}
    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    {...extractSupportProps(rest)}
  >
    {prefixIcon && (
      <IconWrapper data-size={size} data-variant={variant} data-test-id={'link__prefix-icon'}>
        {prefixIcon}
      </IconWrapper>
    )}
    {text}
    {showSuffixIcon && <StyledArrowLinkInterfaceSVG data-test-id={'link__suffix-icon'} />}
  </StyledLink>
);

Link.variants = Variant;
Link.sizes = Sizes;
