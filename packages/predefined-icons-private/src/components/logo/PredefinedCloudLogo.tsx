import { CloudFullLogoSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Wrapper } from './styled';

export type PredefinedCloudLogoProps = WithSupportProps<{
  height: number;
  className?: string;
}>;

export function PredefinedCloudLogo({ height, className, ...rest }: PredefinedCloudLogoProps) {
  return (
    <Wrapper height={height} className={className} {...extractSupportProps(rest)}>
      <CloudFullLogoSVG />
    </Wrapper>
  );
}
