import { InfoRow, InfoRowProps } from '@sbercloud/uikit-product-info-row';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { MobileInfoRow, MobileInfoRowProps } from '../MobileInfoRow';

export function AdaptiveInfoRow({
  layoutType,
  ...props
}: WithLayoutType<InfoRowProps & Pick<MobileInfoRowProps, 'position'>>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileInfoRow {...props} /> : <InfoRow {...props} />;
}

export function getPosition({ index, length }: { index: number; length: number }): MobileInfoRowProps['position'] {
  if (length < 2) {
    return 'inner';
  }

  if (index === 0) {
    return 'first';
  }

  if (index === length - 1) {
    return 'last';
  }

  return 'inner';
}

export type { InfoRowProps };
