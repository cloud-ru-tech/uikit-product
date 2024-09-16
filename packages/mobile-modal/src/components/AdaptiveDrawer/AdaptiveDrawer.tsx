import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Drawer, DrawerCustom, DrawerProps } from '@snack-uikit/drawer';

import { MobileModal } from '../MobileModal';
import { MobileModalCustom } from '../MobileModalCustom';

export function AdaptiveDrawer({ layoutType, ...props }: WithLayoutType<DrawerProps>) {
  const isMobile = layoutType === 'mobile';

  return isMobile ? (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <MobileModal {...props} />
  ) : (
    <Drawer {...props} />
  );
}

export function useAdaptiveDrawerCustom({ layoutType }: WithLayoutType) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? MobileModalCustom : DrawerCustom;
}

export type { DrawerProps };
