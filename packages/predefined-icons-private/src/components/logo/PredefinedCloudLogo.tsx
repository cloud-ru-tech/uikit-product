import { CloudFullLogoSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Variant } from './constants';
import { Wrapper } from './styled';

export type PredefinedCloudLogoProps = WithSupportProps<{
  variant?: Variant;
  height: number;
  className?: string;
}>;

export function PredefinedCloudLogo({
  variant = Variant.OnDefault,
  height,
  className,
  ...rest
}: PredefinedCloudLogoProps) {
  return (
    <Wrapper data-variant={variant} height={height} className={className} {...extractSupportProps(rest)}>
      <CloudFullLogoSVG />
    </Wrapper>
  );
}

PredefinedCloudLogo.variants = Variant;
