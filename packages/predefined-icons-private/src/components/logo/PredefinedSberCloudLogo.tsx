import { SberCloudFullLogoSVG } from '@sbercloud/uikit-product-icons';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { Wrapper } from './styled';

export type PredefinedSberCloudLogoProps = WithSupportProps<{
  height: number;
  className?: string;
}>;

export function PredefinedSberCloudLogo({ height, className, ...rest }: PredefinedSberCloudLogoProps) {
  return (
    <Wrapper height={height} className={className} {...extractSupportProps(rest)}>
      <SberCloudFullLogoSVG />
    </Wrapper>
  );
}
