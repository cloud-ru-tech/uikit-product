import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Orientation, Variant } from './constants';
import { StyledDivider } from './styled';

export type DividerProps = WithSupportProps<{
  className?: string;
  variant?: Variant;
  orientation?: Orientation;
}>;

export function Divider({
  className,
  variant = Variant.Primary,
  orientation = Orientation.Horizontal,
  ...rest
}: DividerProps) {
  return (
    <StyledDivider className={className} variant={variant} orientation={orientation} {...extractSupportProps(rest)} />
  );
}

Divider.variants = Variant;
Divider.orientations = Orientation;
