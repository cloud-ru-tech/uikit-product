import { MlSpaceFullLogoSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Variant } from './constants';
import { Wrapper } from './styled';

export type PredefinedMLSpaceLogoProps = WithSupportProps<{
  variant?: Variant;
  height: number;
  className?: string;
}>;

export function PredefinedMLSpaceLogo({
  variant = Variant.OnDefault,
  height,
  className,
  ...rest
}: PredefinedMLSpaceLogoProps) {
  return (
    <Wrapper data-variant={variant} height={height} className={className} {...extractSupportProps(rest)}>
      <MlSpaceFullLogoSVG />
    </Wrapper>
  );
}

PredefinedMLSpaceLogo.variants = Variant;
