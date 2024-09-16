import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { ProductHeader, ProductHeaderProps } from '../ProductHeader';
import { ProductHeaderMobile } from '../ProductHeaderMobile';

export type HeaderProps = WithLayoutType<ProductHeaderProps>;

export function Header({ layoutType, ...props }: HeaderProps) {
  if (layoutType === 'mobile' || layoutType === 'desktopSmall') {
    return <ProductHeaderMobile {...props} />;
  }

  return <ProductHeader {...props} />;
}
