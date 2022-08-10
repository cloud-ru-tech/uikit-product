import { MlSpaceFullLogoSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Wrapper } from './styled';

export type PredefinedMLSpaceLogoProps = WithSupportProps<{
  height: number;
  className?: string;
}>;

export function PredefinedMLSpaceLogo({ height, className, ...rest }: PredefinedMLSpaceLogoProps) {
  return (
    <Wrapper height={height} className={className} {...extractSupportProps(rest)}>
      <MlSpaceFullLogoSVG />
    </Wrapper>
  );
}
